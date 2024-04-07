import { AUTO_APPOINTMENT_GENERATION_DEFAULT_VALUE, AUTO_APPOINTMENT_GENERATION_KEY } from '@/constants';

import { database } from '@/lib/database';

export const getAppointments = async () => {
	try {
		const appointments = await database.appointment.findMany();
		return appointments;
	} catch (error) {
		return [];
	}
};

export const getAppointmentCount = async (variant: 'booked' | 'available') => {
	try {
		switch (variant) {
			case 'booked':
				const bookedAppointments = await database.appointment.aggregate({
					_count: {
						id: true,
					},
					where: {
						Booking: {
							id: {
								not: undefined,
							},
						},
					},
				});
				return bookedAppointments._count.id;
			case 'available':
				const availableAppointments = await database.appointment.aggregate({
					_count: {
						id: true,
					},
					where: {
						Booking: null,
					},
				});
				return availableAppointments._count.id;
		}
	} catch (error) {
		return null;
	}
};

export const getAutoAppointmentGenerationStatus = async () => {
	const autoAppointmentGeneration = await database.configuration.findUnique({
		where: {
			name: AUTO_APPOINTMENT_GENERATION_KEY,
		},
	});

	if (!autoAppointmentGeneration)
		return (
			await database.configuration.create({
				data: {
					name: AUTO_APPOINTMENT_GENERATION_KEY,
					value: AUTO_APPOINTMENT_GENERATION_DEFAULT_VALUE,
				},
			})
		).value;
	return autoAppointmentGeneration.value;
};

export const getAvailableAppointmentsInInterval = async (interval: { start: Date; end: Date }) => {
	try {
		const appointments = await database.appointment.findMany({
			where: {
				AND: [
					{ Booking: null },
					{
						startTime: {
							gte: interval.start,
							lte: interval.end,
						},
					},
				],
			},
		});
		return appointments;
	} catch (error) {
		return [];
	}
};
