'use server';

import { z } from 'zod';

import {
	ACTION_APPOINTMENT_AUTO_GENERATION_DISABLED_SUCCESS,
	ACTION_APPOINTMENT_AUTO_GENERATION_ENABLED_SUCCESS,
	ACTION_INVALID_PAYLOAD_ERROR,
	ACTION_ONLY_ADMIN_ERROR,
	AUTO_APPOINTMENT_GENERATION_KEY,
} from '@/constants';
import { getCurrentUser } from '@/lib/auth';
import { database } from '@/lib/database';
import { AppointmentGenerationSchema } from '@/schemas';

export const toggleAutoAppointmentGeneration = async (values: z.infer<typeof AppointmentGenerationSchema>) => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const validatedData = AppointmentGenerationSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { autoAppointmentGeneration } = validatedData.data;

	await database.configuration.update({
		where: { name: AUTO_APPOINTMENT_GENERATION_KEY },
		data: {
			value: autoAppointmentGeneration ? 1 : 0,
		},
	});

	return {
		success: autoAppointmentGeneration
			? ACTION_APPOINTMENT_AUTO_GENERATION_ENABLED_SUCCESS
			: ACTION_APPOINTMENT_AUTO_GENERATION_DISABLED_SUCCESS,
	};
};
