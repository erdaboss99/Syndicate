'use server';

import { z } from 'zod';

import {
	ACTION_APPOINTMENT_DELETED_SUCCESS,
	ACTION_APPOINTMENT_DELETE_BOOKED_ERROR,
	ACTION_APPOINTMENT_NOT_FOUND_ERROR,
	ACTION_INVALID_PAYLOAD_ERROR,
	ACTION_ONLY_ADMIN_ERROR,
} from '@/constants';
import { getSelectedAppointmentDataSubset } from '@/data/appointment';
import { getCurrentUser } from '@/lib/auth';
import { database } from '@/lib/database';
import { AppointmentDeleteFormSchema } from '@/schemas';

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
