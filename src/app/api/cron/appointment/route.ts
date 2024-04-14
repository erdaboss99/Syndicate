import { type Appointment } from '@prisma/client';
import { add, endOfDay, isWeekend, startOfDay } from 'date-fns';

import {
	ACTION_AUTO_EXPIRED_APPOINTMENT_DELETION_DISABLED_INFO,
	ACTION_AUTO_NEW_APPOINTMENT_GENERATION_DISABLED_INFO,
	ACTION_ONLY_ADMIN_ERROR,
	ACTION_ONLY_AUTHENTICATED_ERROR,
	APPOINTMENT_DURATION,
	CLOSING_HOUR,
	FURTHEST_APPOINTMENT_DATE,
	OPENING_HOUR,
} from '@/constants';
import {
	getAppointmentsInInterval,
	getAutoExpiredAppointmentDeletionStatus,
	getAutoNewAppointmentGenerationStatus,
	getExpiredAppointments,
} from '@/data/appointment';
import { type ExpiredAppointmentDeletionTemplateProps } from '@/emails/ExpiredAppointmentDeletionTemplate';
import { type NewAppointmentGenerationTemplateProps } from '@/emails/NewAppointmentGeneration';
import { getCurrentUser } from '@/lib/auth';
import { database } from '@/lib/database';
import { formatDatesInObject } from '@/lib/date';
import { sendExpiredAppointmentDeletionReport, sendNewAppointmentGenerationReport } from '@/lib/mail';

export async function POST() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return new Response(JSON.stringify({ message: ACTION_ONLY_AUTHENTICATED_ERROR }), {
			status: 401,
		});
	}

	if (currentUser.role !== 'ADMIN')
		return new Response(JSON.stringify({ message: ACTION_ONLY_ADMIN_ERROR }), {
			status: 403,
		});

	const autoAppointmentGenerationStatus = await getAutoNewAppointmentGenerationStatus();

	if (Boolean(autoAppointmentGenerationStatus)) {
		const currentTime = new Date();
		const intervalStart = startOfDay(currentTime);
		const intervalEnd = endOfDay(add(startOfDay(currentTime), { days: FURTHEST_APPOINTMENT_DATE }));

		const workDaysInInterval: Date[] = [];
		const weekendDaysInInterval: Date[] = [];
		const generatedNewAppointments: { startTime: Date; endTime: Date }[] = [];

		const existingAppointments = await getAppointmentsInInterval({
			interval: { start: intervalStart, end: intervalEnd },
			status: 'ALL',
		});

		for (let i = intervalStart; i <= intervalEnd; i = add(i, { days: 1 })) {
			const startOfThisDay = add(i, { hours: OPENING_HOUR });
			const endOfThisDay = add(i, { hours: CLOSING_HOUR });

			if (isWeekend(startOfThisDay)) {
				weekendDaysInInterval.push(startOfThisDay);
				continue;
			}
			workDaysInInterval.push(startOfThisDay);

			for (let j = startOfThisDay; j < endOfThisDay; j = add(j, { minutes: APPOINTMENT_DURATION })) {
				if (!existingAppointments.find((appointment) => appointment.startTime.getTime() === j.getTime())) {
					const currentAppointment = await database.appointment.create({
						data: {
							startTime: j,
						},
					});
					generatedNewAppointments.push({
						startTime: currentAppointment.startTime,
						endTime: add(currentAppointment.startTime, { minutes: APPOINTMENT_DURATION }),
					});
				}
			}
		}

		const reportEmailParams: NewAppointmentGenerationTemplateProps = {
			message: `${generatedNewAppointments.length} new appointments were created.`,
			intervalStart,
			intervalEnd,
			workDaysInInterval,
			weekendDaysInInterval,
			generatedNewAppointments,
		};
		await sendNewAppointmentGenerationReport(reportEmailParams);

		return new Response(JSON.stringify(formatDatesInObject(reportEmailParams)), {
			status: 201,
		});
	}

	return new Response(
		JSON.stringify({
			message: ACTION_AUTO_NEW_APPOINTMENT_GENERATION_DISABLED_INFO,
		}),
		{ status: 200 },
	);
}

export async function DELETE() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return new Response(JSON.stringify({ message: ACTION_ONLY_AUTHENTICATED_ERROR }), {
			status: 401,
		});
	}

	if (currentUser.role !== 'ADMIN')
		return new Response(JSON.stringify({ message: ACTION_ONLY_ADMIN_ERROR }), {
			status: 403,
		});

	const autoAppointmentDeletionStatus = await getAutoExpiredAppointmentDeletionStatus();

	if (Boolean(autoAppointmentDeletionStatus)) {
		const expiredUnbookedAppointments = await getExpiredAppointments({ status: 'UNBOOKED' });

		const deletedAppointments: Appointment[] = [];
		for (const appointment of expiredUnbookedAppointments) {
			deletedAppointments.push(
				await database.appointment.delete({
					where: {
						id: appointment.id,
					},
				}),
			);
		}
		const deletedExpiredAppointments = deletedAppointments.map((appointment) => {
			return {
				startTime: appointment.startTime,
				endTime: add(appointment.startTime, { minutes: APPOINTMENT_DURATION }),
			};
		});

		const reportEmailParams: ExpiredAppointmentDeletionTemplateProps = {
			message: `${deletedAppointments.length} appointments were deleted due to expiration.`,
			deletedExpiredAppointments,
		};
		await sendExpiredAppointmentDeletionReport(reportEmailParams);

		return new Response(JSON.stringify(formatDatesInObject(reportEmailParams)), {
			status: 201,
		});
	}

	return new Response(
		JSON.stringify({
			message: ACTION_AUTO_EXPIRED_APPOINTMENT_DELETION_DISABLED_INFO,
		}),
		{ status: 200 },
	);
}
