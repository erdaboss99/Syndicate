import {
	AUTO_EXPIRED_APPOINTMENT_DELETION_DEFAULT_VALUE,
	AUTO_EXPIRED_APPOINTMENT_DELETION_KEY,
	AUTO_EXPIRED_BOOKING_DELETION_DEFAULT_VALUE,
	AUTO_EXPIRED_BOOKING_DELETION_KEY,
	AUTO_NEW_APPOINTMENT_GENERATION_DEFAULT_VALUE,
	AUTO_NEW_APPOINTMENT_GENERATION_KEY,
	SEND_AUTO_ACTION_REPORT_EMAIL_DEFAULT_VALUE,
	SEND_AUTO_ACTION_REPORT_EMAIL_KEY,
} from '@/constants';
import { database } from '@/lib/database';

export const getAutoNewAppointmentGenerationStatus = async () => {
	const autoNewAppointmentGenerationStatus = await database.configuration.findUnique({
		where: {
			name: AUTO_NEW_APPOINTMENT_GENERATION_KEY,
		},
	});

	if (!autoNewAppointmentGenerationStatus)
		return (
			await database.configuration.create({
				data: {
					name: AUTO_NEW_APPOINTMENT_GENERATION_KEY,
					value: AUTO_NEW_APPOINTMENT_GENERATION_DEFAULT_VALUE,
				},
			})
		).value;
	return autoNewAppointmentGenerationStatus.value;
};

export const getAutoExpiredAppointmentDeletionStatus = async () => {
	const autoExpiredAppointmentDeletionStatus = await database.configuration.findUnique({
		where: {
			name: AUTO_EXPIRED_APPOINTMENT_DELETION_KEY,
		},
	});

	if (!autoExpiredAppointmentDeletionStatus)
		return (
			await database.configuration.create({
				data: {
					name: AUTO_EXPIRED_APPOINTMENT_DELETION_KEY,
					value: AUTO_EXPIRED_APPOINTMENT_DELETION_DEFAULT_VALUE,
				},
			})
		).value;
	return autoExpiredAppointmentDeletionStatus.value;
};

export const getAutoBookingDeletionStatus = async () => {
	const autoExpiredBookingDeletion = await database.configuration.findUnique({
		where: {
			name: AUTO_EXPIRED_BOOKING_DELETION_KEY,
		},
	});

	if (!autoExpiredBookingDeletion)
		return (
			await database.configuration.create({
				data: {
					name: AUTO_EXPIRED_BOOKING_DELETION_KEY,
					value: AUTO_EXPIRED_BOOKING_DELETION_DEFAULT_VALUE,
				},
			})
		).value;
	return autoExpiredBookingDeletion.value;
};

export const getSendAutoActionReportEmailStatus = async () => {
	const autoActionReportEmailStatus = await database.configuration.findUnique({
		where: {
			name: SEND_AUTO_ACTION_REPORT_EMAIL_KEY,
		},
	});

	if (!autoActionReportEmailStatus)
		return (
			await database.configuration.create({
				data: {
					name: SEND_AUTO_ACTION_REPORT_EMAIL_KEY,
					value: SEND_AUTO_ACTION_REPORT_EMAIL_DEFAULT_VALUE,
				},
			})
		).value;
	return autoActionReportEmailStatus.value;
};
