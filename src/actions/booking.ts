'use server';

import { z } from 'zod';

import {
	ACTION_BOOKING_CREATED_SUCCESS,
	ACTION_INVALID_PAYLOAD_ERROR,
	ACTION_ONLY_AUTHENTICATED_ERROR,
} from '@/constants';
import { getCurrentUser } from '@/lib/auth';
import { database } from '@/lib/database';
import { sendBookingConfirmationEmail } from '@/lib/mail';
import { AppointmentBookFormSchema } from '@/schemas';

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
