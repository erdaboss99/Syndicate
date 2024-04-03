import { add, endOfDay, isWeekend, startOfDay } from 'date-fns';

import {
	API_AUTHENTICATION_ERROR_CODE,
	API_FORBIDDEN_ERROR_CODE,
	API_FORBIDDEN_ONLY_ADMIN_ROUTE_ERROR_MESSAGE,
	API_ONLY_AUTHENTICATED_ERROR_MESSAGE,
	API_SUCCESSFUL_MODIFICATION_CODE,
	API_SUCCESSFUL_REQUEST_CODE,
	APPOINTMENT_DURATION,
	CLOSING_HOUR,
	FURTHEST_APPOINTMENT_DATE,
	OPENING_HOUR,
} from '@/constants';

import { getCurrentUser } from '@/lib/auth';

import { database } from '@/lib/database';

import { formatDatesInObject } from '@/lib/date';

import { getAutoAppointmentGenerationStatus } from '@/data/appointments';

import { Appointment } from '@prisma/client';

export async function POST() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return new Response(JSON.stringify({ message: API_ONLY_AUTHENTICATED_ERROR_MESSAGE }), {
			status: API_AUTHENTICATION_ERROR_CODE,
		});
	}

	if (currentUser.role !== 'ADMIN')
		return new Response(JSON.stringify({ message: API_FORBIDDEN_ONLY_ADMIN_ROUTE_ERROR_MESSAGE }), {
			status: API_FORBIDDEN_ERROR_CODE,
		});

	const autoAppointmentGeneration = await getAutoAppointmentGenerationStatus();

	if (Boolean(autoAppointmentGeneration)) {
		const currentTime = new Date();
		const intervalStart = startOfDay(currentTime);
		const intervalEnd = endOfDay(add(startOfDay(currentTime), { days: FURTHEST_APPOINTMENT_DATE }));

		const daysInInterval: { dayStart: string; dayEnd: string }[] = [];
		const weekendDaysInInterval: { dayStart: string; dayEnd: string }[] = [];
		const createdAppointments: Appointment[] = [];

		const existingAppointments = await database.appointment.findMany({
			where: {
				startTime: {
					gte: intervalStart,
					lte: intervalEnd,
				},
			},
		});

		for (let i = intervalStart; i <= intervalEnd; i = add(i, { days: 1 })) {
			const startOfThisDay = add(i, { hours: OPENING_HOUR });
			const endOfThisDay = add(i, { hours: CLOSING_HOUR });
			daysInInterval.push({ dayStart: startOfThisDay.toISOString(), dayEnd: endOfThisDay.toISOString() });
			if (isWeekend(startOfThisDay)) {
				weekendDaysInInterval.push({
					dayStart: startOfThisDay.toISOString(),
					dayEnd: endOfThisDay.toISOString(),
				});
				continue;
			}

			for (let j = startOfThisDay; j < endOfThisDay; j = add(j, { minutes: APPOINTMENT_DURATION })) {
				if (!existingAppointments.find((appointment) => appointment.startTime.getTime() === j.getTime())) {
					const currentAppointment = await database.appointment.create({
						data: {
							startTime: j,
						},
					});
					createdAppointments.push(currentAppointment);
				}
			}
		}

		const responseObject = formatDatesInObject({
			message: `${existingAppointments.length} appointments were already existing, ${createdAppointments.length} new appointments were created.`,
			currentDate: currentTime,
			intervalStart: intervalStart,
			intervalEnd: intervalEnd,
			daysInInterval: daysInInterval,
			weekendDaysInInterval: weekendDaysInInterval,
			existingAppointments: existingAppointments,
			createdAppointments: createdAppointments,
		});

		return new Response(JSON.stringify(responseObject), { status: API_SUCCESSFUL_MODIFICATION_CODE });
	}

	return new Response(
		JSON.stringify({
			message: 'Automatic appointment generation is disabled.',
		}),
		{ status: API_SUCCESSFUL_REQUEST_CODE },
	);
}

export async function DELETE() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return new Response(JSON.stringify({ message: API_ONLY_AUTHENTICATED_ERROR_MESSAGE }), {
			status: API_AUTHENTICATION_ERROR_CODE,
		});
	}

	if (currentUser.role !== 'ADMIN')
		return new Response(JSON.stringify({ message: API_FORBIDDEN_ONLY_ADMIN_ROUTE_ERROR_MESSAGE }), {
			status: API_FORBIDDEN_ERROR_CODE,
		});

	const currentTime = new Date();
	const intervalStart = startOfDay(currentTime);

	const expiredAppointments = await database.appointment.findMany({
		where: {
			startTime: {
				lte: intervalStart,
			},
		},
		select: {
			id: true,
			startTime: true,
			Booking: {
				select: {
					id: true,
					description: true,
					User: {
						select: {
							id: true,
							name: true,
							email: true,
							role: true,
						},
					},
				},
			},
		},
	});

	const expiredBookedAppointments = expiredAppointments.filter((appointment) => appointment.Booking !== null);
	const expiredUnbookedAppointments = expiredAppointments.filter((appointment) => appointment.Booking === null);

	const deletedAppointments: Appointment[] = [];
	for (const appointment of expiredUnbookedAppointments) {
		console.log(appointment);
		deletedAppointments.push(
			await database.appointment.delete({
				where: {
					id: appointment.id,
				},
			}),
		);
	}

	const responseObject = formatDatesInObject({
		message: `${deletedAppointments.length} appointments were deleted due to expiration, ${expiredBookedAppointments.length} appointments were not deleted because they were booked.`,
		currentDate: currentTime,
		intervalStart: intervalStart,
		expiredBookedAppointments: expiredBookedAppointments,
		deletedAppointments: deletedAppointments,
	});

	return new Response(JSON.stringify(responseObject), { status: API_SUCCESSFUL_MODIFICATION_CODE });
}
