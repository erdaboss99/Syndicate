import { Prisma } from '@prisma/client';

import { database } from '@/lib/database';
import { getWeekIntervalFromDay } from '@/lib/date';

export const getBookingById = async (id: string) => {
	try {
		const booking = await database.booking.findUnique({ where: { id } });
		return booking;
	} catch (error) {
		return null;
	}
};

export const getBookingCount = async (options: { status: 'ALL' | 'WEEKLY' }) => {
	try {
		switch (options.status) {
			case 'ALL':
				const allBookingCount = await database.booking.aggregate({
					_count: {
						id: true,
					},
				});
				return allBookingCount._count.id;
			case 'WEEKLY':
				const thisWeeksInterval = getWeekIntervalFromDay(new Date());
				const thisWeeksBookingCount = await database.booking.aggregate({
					_count: {
						id: true,
					},
					where: {
						Appointment: {
							startTime: {
								gte: thisWeeksInterval.start,
								lte: thisWeeksInterval.end,
							},
						},
					},
				});
				return thisWeeksBookingCount._count.id;
		}
	} catch (error) {
		return null;
	}
};

export const getBookingDataSubset = async <T extends Prisma.BookingSelect>(
	select: T,
): Promise<Prisma.BookingGetPayload<{ select: T }>[]> => {
	try {
		const bookingSubset = await database.booking.findMany({
			select,
		});
		return bookingSubset;
	} catch (error) {
		return [];
	}
};

export const getSelectedBookingDataSubset = async <T extends Prisma.BookingSelect>(options: {
	id: string;
	select: T;
}): Promise<Prisma.BookingGetPayload<{ select: T }> | null> => {
	try {
		const bookingData = await database.booking.findFirst({
			where: { id: options.id },
			select: options.select,
		});
		return bookingData;
	} catch (error) {
		return null;
	}
};

export const getExpiredBookings = async () => {
	const currentTime = new Date();
	try {
		const expiredBookings = await database.booking.findMany({
			where: {
				Appointment: {
					startTime: {
						lte: currentTime,
					},
				},
			},
		});
		return expiredBookings;
	} catch (error) {
		return [];
	}
};
