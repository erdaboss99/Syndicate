'use server';

import { z } from 'zod';

import {
	ACTION_AUTO_EXPIRED_APPOINTMENT_DELETION_DISABLED_SUCCESS,
	ACTION_AUTO_EXPIRED_APPOINTMENT_DELETION_ENABLED_SUCCESS,
	ACTION_AUTO_NEW_APPOINTMENT_GENERATION_DISABLED_SUCCESS,
	ACTION_AUTO_NEW_APPOINTMENT_GENERATION_ENABLED_SUCCESS,
	ACTION_INVALID_PAYLOAD_ERROR,
	ACTION_ONLY_ADMIN_ERROR,
	AUTO_EXPIRED_APPOINTMENT_DELETION_KEY,
	AUTO_NEW_APPOINTMENT_GENERATION_KEY,
} from '@/constants';
import { getCurrentUser } from '@/lib/auth';
import { database } from '@/lib/database';
import { AutoExpiredAppointmentDeletionSchema, AutoNewAppointmentGenerationSchema } from '@/schemas';

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
