'use server';

import { z } from 'zod';

import {
	ACTION_BOOKING_CREATED_SUCCESS,
	ACTION_BOOKING_DELETED_SUCCESS,
	ACTION_BOOKING_NOT_FOUND_ERROR,
	ACTION_INVALID_PAYLOAD_ERROR,
	ACTION_ONLY_ADMIN_ERROR,
	ACTION_ONLY_AUTHENTICATED_ERROR,
} from '@/constants';
import { getUniqueBookingDataSubset } from '@/data/booking';
import { getCurrentUser } from '@/lib/auth';
import { database } from '@/lib/database';
import { sendBookingConfirmationEmail, sendBookingDeletionEmail } from '@/lib/mail';
import { AppointmentBookSchema, BookingDeleteSchema } from '@/schemas';

export const deleteBooking = async (values: z.infer<typeof BookingDeleteSchema>) => {
	const user = await getCurrentUser();
	if (user?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const validatedData = BookingDeleteSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { id, reason } = validatedData.data;

	const existingBooking = await getUniqueBookingDataSubset({ where: { id }, select: { id: true } });
	if (!existingBooking) return { error: ACTION_BOOKING_NOT_FOUND_ERROR };

	const deletedBooking = await database.booking.delete({
		where: {
			id,
		},
		select: {
			description: true,
			Appointment: {
				select: {
					startTime: true,
				},
			},
			User: {
				select: {
					name: true,
					email: true,
				},
			},
			Issue: {
				select: {
					name: true,
					description: true,
				},
			},
		},
	});

	await sendBookingDeletionEmail({
		userName: deletedBooking.User.name!,
		userEmail: deletedBooking.User.email!,
		appointmentStartTime: deletedBooking.Appointment.startTime,
		bookingDescription: deletedBooking.description,
		issueName: deletedBooking.Issue.name,
		issueDescription: deletedBooking.Issue.description,
		reason,
	});

	return { success: ACTION_BOOKING_DELETED_SUCCESS };
};

export const createBooking = async (values: z.infer<typeof AppointmentBookSchema>) => {
	const currentUser = await getCurrentUser();
	if (!currentUser) return { error: ACTION_ONLY_AUTHENTICATED_ERROR };

	const validatedData = AppointmentBookSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { appointmentId, issueId, description } = validatedData.data;

	const createdBooking = await database.booking.create({
		data: {
			userId: currentUser.id,
			appointmentId: appointmentId,
			issueId: issueId,
			description: description,
		},
		select: {
			description: true,
			Appointment: {
				select: {
					startTime: true,
				},
			},
			User: {
				select: {
					name: true,
					email: true,
				},
			},
			Issue: {
				select: {
					name: true,
					description: true,
				},
			},
		},
	});

	await sendBookingConfirmationEmail({
		userName: createdBooking.User.name!,
		userEmail: createdBooking.User.email!,
		appointmentStartTime: createdBooking.Appointment.startTime,
		bookingDescription: createdBooking.description,
		issueName: createdBooking.Issue.name,
		issueDescription: createdBooking.Issue.description,
		bookingConfirmationDate: new Date(),
	});

	return { success: ACTION_BOOKING_CREATED_SUCCESS };
};
