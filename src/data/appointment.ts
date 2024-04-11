import { AUTO_APPOINTMENT_GENERATION_DEFAULT_VALUE, AUTO_APPOINTMENT_GENERATION_KEY } from '@/constants';
import { database } from '@/lib/database';

export const getAppointments = async () => {
	try {
		const appointments = await database.appointment.findMany({
			orderBy: {
				startTime: 'asc',
			},
		});
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
			orderBy: {
				startTime: 'asc',
			},
		});
		return appointments;
	} catch (error) {
		return [];
	}
};

export const getAppointmentById = async (id: string, variant: 'onlyAvailable' | 'onlyBooked') => {
	try {
		switch (variant) {
			case 'onlyAvailable':
				const freeAppointment = await database.appointment.findFirst({
					where: {
						AND: [
							{ Booking: null },
							{
								id,
							},
						],
					},
					orderBy: {
						startTime: 'asc',
					},
				});
				return freeAppointment;
			case 'onlyBooked':
				const bookedAppointment = await database.appointment.findFirst({
					where: {
						AND: [
							{
								Booking: {
									id: {
										not: undefined,
									},
								},
							},
							{
								id,
							},
						],
					},
					orderBy: {
						startTime: 'asc',
					},
				});
				return bookedAppointment;
		}
	} catch (error) {
		return null;
	}
};
