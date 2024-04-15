'use server';

import { z } from 'zod';

import {
	ACTION_APPOINTMENT_DELETED_SUCCESS,
	ACTION_APPOINTMENT_DELETE_BOOKED_ERROR,
	ACTION_APPOINTMENT_NOT_FOUND_ERROR,
	ACTION_AUTO_EXPIRED_APPOINTMENT_DELETION_DISABLED_SUCCESS,
	ACTION_AUTO_EXPIRED_APPOINTMENT_DELETION_ENABLED_SUCCESS,
	ACTION_AUTO_NEW_APPOINTMENT_GENERATION_DISABLED_SUCCESS,
	ACTION_AUTO_NEW_APPOINTMENT_GENERATION_ENABLED_SUCCESS,
	ACTION_INVALID_PAYLOAD_ERROR,
	ACTION_ONLY_ADMIN_ERROR,
	AUTO_EXPIRED_APPOINTMENT_DELETION_KEY,
	AUTO_NEW_APPOINTMENT_GENERATION_KEY,
} from '@/constants';
import { getSelectedAppointmentDataSubset } from '@/data/appointment';
import { getCurrentUser } from '@/lib/auth';
import { database } from '@/lib/database';
import {
	AppointmentDeleteFormSchema,
	AutoExpiredAppointmentDeletionSchema,
	AutoNewAppointmentGenerationSchema,
} from '@/schemas';

export const deleteAppointment = async (values: z.infer<typeof AppointmentDeleteFormSchema>) => {
	const user = await getCurrentUser();
	if (user?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const validatedData = AppointmentDeleteFormSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { id } = validatedData.data;

	const existingAppointment = await getSelectedAppointmentDataSubset({
		id,
		select: {
			id: true,
			Booking: {
				select: {
					id: true,
				},
			},
		},
	});

	if (!existingAppointment) return { error: ACTION_APPOINTMENT_NOT_FOUND_ERROR };

	if (existingAppointment.Booking?.id !== undefined) return { error: ACTION_APPOINTMENT_DELETE_BOOKED_ERROR };

	await database.appointment.delete({
		where: {
			id,
		},
	});

	return { success: ACTION_APPOINTMENT_DELETED_SUCCESS };
};

export const toggleAutoNewAppointmentGeneration = async (
	values: z.infer<typeof AutoNewAppointmentGenerationSchema>,
) => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const validatedData = AutoNewAppointmentGenerationSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { autoNewAppointmentGenerationStatus } = validatedData.data;

	await database.configuration.update({
		where: { name: AUTO_NEW_APPOINTMENT_GENERATION_KEY },
		data: {
			value: autoNewAppointmentGenerationStatus ? 1 : 0,
		},
	});

	return {
		success: autoNewAppointmentGenerationStatus
			? ACTION_AUTO_NEW_APPOINTMENT_GENERATION_ENABLED_SUCCESS
			: ACTION_AUTO_NEW_APPOINTMENT_GENERATION_DISABLED_SUCCESS,
	};
};

export const toggleAutoExpiredAppointmentDeletion = async (
	values: z.infer<typeof AutoExpiredAppointmentDeletionSchema>,
) => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const validatedData = AutoExpiredAppointmentDeletionSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { autoExpiredAppointmentDeletionStatus } = validatedData.data;

	await database.configuration.update({
		where: { name: AUTO_EXPIRED_APPOINTMENT_DELETION_KEY },
		data: {
			value: autoExpiredAppointmentDeletionStatus ? 1 : 0,
		},
	});

	return {
		success: autoExpiredAppointmentDeletionStatus
			? ACTION_AUTO_EXPIRED_APPOINTMENT_DELETION_ENABLED_SUCCESS
			: ACTION_AUTO_EXPIRED_APPOINTMENT_DELETION_DISABLED_SUCCESS,
	};
};
