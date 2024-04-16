import { Prisma } from '@prisma/client';

import { database } from '@/lib/database';

export const getAppointmentById = async (options: { id: string; status: 'AVAILABLE' | 'BOOKED' }) => {
	try {
		switch (options.status) {
			case 'AVAILABLE':
				const availableAppointment = await database.appointment.findFirst({
					where: {
						AND: [
							{ Booking: null },
							{
								id: options.id,
							},
						],
					},
					orderBy: {
						startTime: 'asc',
					},
				});
				return availableAppointment;
			case 'BOOKED':
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
								id: options.id,
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

export const getAppointmentDataSubset = async <T extends Prisma.AppointmentSelect>(
	select: T,
): Promise<Prisma.AppointmentGetPayload<{ select: T }>[]> => {
	try {
		const appointmentSubset = await database.appointment.findMany({
			select,
		});
		return appointmentSubset;
	} catch (error) {
		return [];
	}
};

export const getSelectedAppointmentDataSubset = async <T extends Prisma.AppointmentSelect>(options: {
	id: string;
	select: T;
}): Promise<Prisma.AppointmentGetPayload<{ select: T }> | null> => {
	try {
		const appointmentData = await database.appointment.findFirst({
			where: { id: options.id },
			select: options.select,
		});
		return appointmentData;
	} catch (error) {
		return null;
	}
};

export const getAppointmentCount = async (options: { status: 'BOOKED' | 'AVAILABLE' }) => {
	try {
		switch (options.status) {
			case 'BOOKED':
				const bookedAppointmentCount = await database.appointment.aggregate({
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
				return bookedAppointmentCount._count.id;
			case 'AVAILABLE':
				const availableAppointmentCount = await database.appointment.aggregate({
					_count: {
						id: true,
					},
					where: {
						Booking: null,
					},
				});
				return availableAppointmentCount._count.id;
		}
	} catch (error) {
		return null;
	}
};

export const getAppointmentsInInterval = async (options: {
	interval: { start: Date; end: Date };
	status: 'AVAILABLE' | 'BOOKED' | 'ALL';
}) => {
	try {
		switch (options.status) {
			case 'AVAILABLE':
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
			case 'BOOKED':
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
			case 'ALL':
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

export const getExpiredAppointments = async (options: { status: 'UNBOOKED' | 'BOOKED' }) => {
	const currentTime = new Date();
	try {
		switch (options.status) {
			case 'UNBOOKED':
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
			case 'BOOKED':
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
