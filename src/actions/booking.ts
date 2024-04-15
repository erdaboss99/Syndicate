'use server';

import { z } from 'zod';

import {
	ACTION_AUTO_EXPIRED_BOOKING_DELETION_DISABLED_SUCCESS,
	ACTION_AUTO_EXPIRED_BOOKING_DELETION_ENABLED_SUCCESS,
	ACTION_BOOKING_CREATED_SUCCESS,
	ACTION_BOOKING_DELETED_SUCCESS,
	ACTION_BOOKING_NOT_FOUND_ERROR,
	ACTION_INVALID_PAYLOAD_ERROR,
	ACTION_ONLY_ADMIN_ERROR,
	ACTION_ONLY_AUTHENTICATED_ERROR,
	AUTO_EXPIRED_BOOKING_DELETION_KEY,
} from '@/constants';
import { getBookingById } from '@/data/booking';
import { getCurrentUser } from '@/lib/auth';
import { database } from '@/lib/database';
import { sendBookingConfirmationEmail, sendBookingDeletionEmail } from '@/lib/mail';
import { AppointmentBookFormSchema, AutoExpiredBookingDeletionSchema, BookingDeleteFormSchema } from '@/schemas';

export const deleteBooking = async (values: z.infer<typeof BookingDeleteFormSchema>) => {
	const user = await getCurrentUser();
	if (user?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const validatedData = BookingDeleteFormSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { id, reason } = validatedData.data;

	const existingBooking = await getBookingById(id);
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

export const toggleAutoBookingDeletion = async (values: z.infer<typeof AutoExpiredBookingDeletionSchema>) => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const validatedData = AutoExpiredBookingDeletionSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { autoExpiredBookingDeletionStatus } = validatedData.data;

	await database.configuration.update({
		where: { name: AUTO_EXPIRED_BOOKING_DELETION_KEY },
		data: {
			value: autoExpiredBookingDeletionStatus ? 1 : 0,
		},
	});

	return {
		success: autoExpiredBookingDeletionStatus
			? ACTION_AUTO_EXPIRED_BOOKING_DELETION_ENABLED_SUCCESS
			: ACTION_AUTO_EXPIRED_BOOKING_DELETION_DISABLED_SUCCESS,
	};
};
