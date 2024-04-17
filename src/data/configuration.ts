import { Prisma } from '@prisma/client';

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

const getUniqueConfiguration = async <
	K extends Prisma.ConfigurationWhereUniqueInput,
	T extends Prisma.ConfigurationSelect,
>(options: {
	where: K;
	select: T;
}): Promise<Prisma.ConfigurationGetPayload<{ select: T }> | null> => {
	try {
		const configuration = await database.configuration.findUnique({
			where: options.where,
			select: options.select,
		});
		return configuration;
	} catch (error) {
		return null;
	}
};

export const updateUniqueConfiguration = async <
	K extends Prisma.ConfigurationWhereUniqueInput,
	D extends Prisma.ConfigurationUpdateInput,
	T extends Prisma.ConfigurationSelect,
>(options: {
	where: K;
	data: D;
	select: T;
}): Promise<Prisma.ConfigurationGetPayload<{ select: T }> | null> => {
	try {
		const configuration = await database.configuration.update({
			where: options.where,
			data: options.data,
			select: options.select,
		});
		return configuration;
	} catch (error) {
		return null;
	}
};

export const createUniqueConfiguration = async <
	D extends Prisma.ConfigurationCreateInput,
	T extends Prisma.ConfigurationSelect,
>(options: {
	data: D;
	select: T;
}): Promise<Prisma.ConfigurationGetPayload<{ select: T }> | null> => {
	try {
		const configuration = await database.configuration.create({
			data: options.data,
			select: options.select,
		});
		return configuration;
	} catch (error) {
		return null;
	}
};

export const getAutoNewAppointmentGenerationStatus = async () => {
	const autoNewAppointmentGenerationStatus = await getUniqueConfiguration({
		where: { name: AUTO_NEW_APPOINTMENT_GENERATION_KEY },
		select: { name: true, value: true },
	});

	if (!autoNewAppointmentGenerationStatus)
		return (await createUniqueConfiguration({
			data: { name: AUTO_NEW_APPOINTMENT_GENERATION_KEY, value: AUTO_NEW_APPOINTMENT_GENERATION_DEFAULT_VALUE },
			select: { value: true },
		}))!.value;
	return autoNewAppointmentGenerationStatus.value;
};

export const getAutoExpiredAppointmentDeletionStatus = async () => {
	const autoExpiredAppointmentDeletionStatus = await getUniqueConfiguration({
		where: { name: AUTO_EXPIRED_APPOINTMENT_DELETION_KEY },
		select: { name: true, value: true },
	});

	if (!autoExpiredAppointmentDeletionStatus)
		return (await createUniqueConfiguration({
			data: {
				name: AUTO_EXPIRED_APPOINTMENT_DELETION_KEY,
				value: AUTO_EXPIRED_APPOINTMENT_DELETION_DEFAULT_VALUE,
			},
			select: { value: true },
		}))!.value;
	return autoExpiredAppointmentDeletionStatus.value;
};

export const getAutoExpiredBookingDeletionStatus = async () => {
	const autoExpiredBookingDeletionStatus = await getUniqueConfiguration({
		where: { name: AUTO_EXPIRED_BOOKING_DELETION_KEY },
		select: { name: true, value: true },
	});

	if (!autoExpiredBookingDeletionStatus)
		return (await createUniqueConfiguration({
			data: { name: AUTO_EXPIRED_BOOKING_DELETION_KEY, value: AUTO_EXPIRED_BOOKING_DELETION_DEFAULT_VALUE },
			select: { value: true },
		}))!.value;
	return autoExpiredBookingDeletionStatus.value;
};

export const getSendAutoActionReportEmailStatus = async () => {
	const autoActionReportEmailStatus = await getUniqueConfiguration({
		where: { name: SEND_AUTO_ACTION_REPORT_EMAIL_KEY },
		select: { name: true, value: true },
	});

	if (!autoActionReportEmailStatus)
		return (await createUniqueConfiguration({
			data: { name: SEND_AUTO_ACTION_REPORT_EMAIL_KEY, value: SEND_AUTO_ACTION_REPORT_EMAIL_DEFAULT_VALUE },
			select: { value: true },
		}))!.value;
	return autoActionReportEmailStatus.value;
};
