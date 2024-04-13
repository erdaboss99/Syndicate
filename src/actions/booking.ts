'use server';

import { z } from 'zod';

import {
	ACTION_BOOKING_AUTO_DELETION_DISABLED_SUCCESS,
	ACTION_BOOKING_AUTO_DELETION_ENABLED_SUCCESS,
	ACTION_BOOKING_CREATED_SUCCESS,
	ACTION_INVALID_PAYLOAD_ERROR,
	ACTION_ONLY_ADMIN_ERROR,
	ACTION_ONLY_AUTHENTICATED_ERROR,
	AUTO_BOOKING_DELETION_KEY,
} from '@/constants';
import { getCurrentUser } from '@/lib/auth';
import { database } from '@/lib/database';
import { sendBookingConfirmationEmail } from '@/lib/mail';
import { AppointmentBookFormSchema, BookingDeletionSchema } from '@/schemas';

export const toggleAutoBookingDeletion = async (values: z.infer<typeof BookingDeletionSchema>) => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const validatedData = BookingDeletionSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { autoBookingDeletion } = validatedData.data;

	await database.configuration.update({
		where: { name: AUTO_BOOKING_DELETION_KEY },
		data: {
			value: autoBookingDeletion ? 1 : 0,
		},
	});

	return {
		success: autoBookingDeletion
			? ACTION_BOOKING_AUTO_DELETION_ENABLED_SUCCESS
			: ACTION_BOOKING_AUTO_DELETION_DISABLED_SUCCESS,
	};
};

export const createBooking = async (values: z.infer<typeof AppointmentBookFormSchema>) => {
	const currentUser = await getCurrentUser();
	if (!currentUser) return { error: ACTION_ONLY_AUTHENTICATED_ERROR };

	const validatedData = AppointmentBookFormSchema.safeParse(values);
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
