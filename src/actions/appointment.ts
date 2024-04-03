'use server';

import { z } from 'zod';

import { AppointmentGenerationSchema } from '@/schemas';

import { database } from '@/lib/database';

import { AUTO_APPOINTMENT_GENERATION_KEY } from '@/constants';

import { getCurrentUser } from '@/lib/auth';

export const toggleAutoAppointmentGeneration = async (values: z.infer<typeof AppointmentGenerationSchema>) => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') return { error: 'Unauthorized!' };

	const validatedData = AppointmentGenerationSchema.safeParse(values);
	if (!validatedData.success) return { error: 'Invalid payload!' };

	const { autoAppointmentGeneration } = validatedData.data;

	await database.configuration.update({
		where: { name: AUTO_APPOINTMENT_GENERATION_KEY },
		data: {
			value: autoAppointmentGeneration ? 1 : 0,
		},
	});

	return {
		success: autoAppointmentGeneration
			? 'Auto appointment generation is enabled!'
			: 'Auto appointment generation is disabled!',
	};
};
