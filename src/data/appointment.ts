import {
	AUTO_APPOINTMENT_DELETION_DEFAULT_VALUE,
	AUTO_APPOINTMENT_DELETION_KEY,
	AUTO_APPOINTMENT_GENERATION_DEFAULT_VALUE,
	AUTO_APPOINTMENT_GENERATION_KEY,
} from '@/constants';
import { database } from '@/lib/database';
import { Prisma } from '@prisma/client';

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

export const getAppointmentSubset = async (select: Prisma.AppointmentSelect) => {
	try {
		const appointments = await database.appointment.findMany({
			select,
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

export const getAppointmentsInInterval = async (options: {
	interval: { start: Date; end: Date };
	status: 'available' | 'booked' | 'all';
}) => {
	try {
		switch (options.status) {
			case 'available':
				const availableAppointmentsInInterval = await database.appointment.findMany({
					where: {
						AND: [
							{ Booking: null },
							{
								startTime: {
									gte: options.interval.start,
									lte: options.interval.end,
								},
							},
						],
					},
					orderBy: {
						startTime: 'asc',
					},
				});
				return availableAppointmentsInInterval;
			case 'booked':
				const bookedAppointmentsInInterval = await database.appointment.findMany({
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
								startTime: {
									gte: options.interval.start,
									lte: options.interval.end,
								},
							},
						],
					},
					orderBy: {
						startTime: 'asc',
					},
				});
				return bookedAppointmentsInInterval;
			case 'all':
				const allAppointmentsInInterval = await database.appointment.findMany({
					where: {
						startTime: {
							gte: options.interval.start,
							lte: options.interval.end,
						},
					},
					orderBy: {
						startTime: 'asc',
					},
				});
				return allAppointmentsInInterval;
		}
	} catch (error) {
		return [];
	}
};

export const getExpiredAppointments = async (options: { status: 'unbooked' | 'booked' }) => {
	const currentTime = new Date();
	try {
		switch (options.status) {
			case 'unbooked':
				const expiredUnbookedAppointments = await database.appointment.findMany({
					where: {
						AND: [
							{ Booking: null },
							{
								startTime: {
									lte: currentTime,
								},
							},
						],
					},
					orderBy: {
						startTime: 'asc',
					},
				});
				return expiredUnbookedAppointments;
			case 'booked':
				const expiredBookedAppointments = await database.appointment.findMany({
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
								startTime: {
									lte: currentTime,
								},
							},
						],
					},
					orderBy: {
						startTime: 'asc',
					},
				});
				return expiredBookedAppointments;
		}
	} catch (error) {
		return [];
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

export const getAutoAppointmentDeletionStatus = async () => {
	const autoAppointmentDeletion = await database.configuration.findUnique({
		where: {
			name: AUTO_APPOINTMENT_DELETION_KEY,
		},
	});

	if (!autoAppointmentDeletion)
		return (
			await database.configuration.create({
				data: {
					name: AUTO_APPOINTMENT_DELETION_KEY,
					value: AUTO_APPOINTMENT_DELETION_DEFAULT_VALUE,
				},
			})
		).value;
	return autoAppointmentDeletion.value;
};
