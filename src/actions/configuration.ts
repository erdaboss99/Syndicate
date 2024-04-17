'use server';

import { z } from 'zod';

import {
	ACTION_AUTO_EXPIRED_APPOINTMENT_DELETION_DISABLED_SUCCESS,
	ACTION_AUTO_EXPIRED_APPOINTMENT_DELETION_ENABLED_SUCCESS,
	ACTION_AUTO_EXPIRED_BOOKING_DELETION_DISABLED_SUCCESS,
	ACTION_AUTO_EXPIRED_BOOKING_DELETION_ENABLED_SUCCESS,
	ACTION_AUTO_NEW_APPOINTMENT_GENERATION_DISABLED_SUCCESS,
	ACTION_AUTO_NEW_APPOINTMENT_GENERATION_ENABLED_SUCCESS,
	ACTION_INVALID_PAYLOAD_ERROR,
	ACTION_ONLY_ADMIN_ERROR,
	ACTION_SEND_AUTO_ACTION_REPORT_EMAIL_DISABLED_SUCCESS,
	ACTION_SEND_AUTO_ACTION_REPORT_EMAIL_ENABLED_SUCCESS,
	AUTO_EXPIRED_APPOINTMENT_DELETION_KEY,
	AUTO_EXPIRED_BOOKING_DELETION_KEY,
	AUTO_NEW_APPOINTMENT_GENERATION_KEY,
	SEND_AUTO_ACTION_REPORT_EMAIL_KEY,
} from '@/constants';
import { updateUniqueConfiguration } from '@/data/configuration';
import { getCurrentUser } from '@/lib/auth';
import {
	AutoExpiredAppointmentDeletionSchema,
	AutoExpiredBookingDeletionSchema,
	AutoNewAppointmentGenerationSchema,
	SendAutoActionReportEmailSchema,
} from '@/schemas';

export const toggleAutoNewAppointmentGeneration = async (
	values: z.infer<typeof AutoNewAppointmentGenerationSchema>,
) => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const validatedData = AutoNewAppointmentGenerationSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { autoNewAppointmentGenerationStatus } = validatedData.data;

	await updateUniqueConfiguration({
		where: { name: AUTO_NEW_APPOINTMENT_GENERATION_KEY },
		data: { value: autoNewAppointmentGenerationStatus ? 1 : 0 },
		select: { value: true },
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

	await updateUniqueConfiguration({
		where: { name: AUTO_EXPIRED_APPOINTMENT_DELETION_KEY },
		data: { value: autoExpiredAppointmentDeletionStatus ? 1 : 0 },
		select: { value: true },
	});

	return {
		success: autoExpiredAppointmentDeletionStatus
			? ACTION_AUTO_EXPIRED_APPOINTMENT_DELETION_ENABLED_SUCCESS
			: ACTION_AUTO_EXPIRED_APPOINTMENT_DELETION_DISABLED_SUCCESS,
	};
};

export const toggleAutoExpiredBookingDeletion = async (values: z.infer<typeof AutoExpiredBookingDeletionSchema>) => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const validatedData = AutoExpiredBookingDeletionSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { autoExpiredBookingDeletionStatus } = validatedData.data;

	await updateUniqueConfiguration({
		where: { name: AUTO_EXPIRED_BOOKING_DELETION_KEY },
		data: { value: autoExpiredBookingDeletionStatus ? 1 : 0 },
		select: { value: true },
	});

	return {
		success: autoExpiredBookingDeletionStatus
			? ACTION_AUTO_EXPIRED_BOOKING_DELETION_ENABLED_SUCCESS
			: ACTION_AUTO_EXPIRED_BOOKING_DELETION_DISABLED_SUCCESS,
	};
};

export const toggleSendAutoActionReportEmail = async (values: z.infer<typeof SendAutoActionReportEmailSchema>) => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const validatedData = SendAutoActionReportEmailSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { sendAutoActionReportEmailStatus } = validatedData.data;

	await updateUniqueConfiguration({
		where: { name: SEND_AUTO_ACTION_REPORT_EMAIL_KEY },
		data: { value: sendAutoActionReportEmailStatus ? 1 : 0 },
		select: { value: true },
	});

	return {
		success: sendAutoActionReportEmailStatus
			? ACTION_SEND_AUTO_ACTION_REPORT_EMAIL_ENABLED_SUCCESS
			: ACTION_SEND_AUTO_ACTION_REPORT_EMAIL_DISABLED_SUCCESS,
	};
};
