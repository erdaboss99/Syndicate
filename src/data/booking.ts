import { database } from '@/lib/database';
import { getWeekIntervalFromDay } from '@/lib/date';
import { Prisma } from '@prisma/client';

export const getBookingCount = async (variant: 'all' | 'forThisWeek') => {
	try {
		switch (variant) {
			case 'all':
				const allBookings = await database.booking.aggregate({
					_count: {
						id: true,
					},
				});
				return allBookings._count.id;
			case 'forThisWeek':
				const thisWeekInterval = getWeekIntervalFromDay(new Date());
				const thisWeekBookings = await database.booking.aggregate({
					_count: {
						id: true,
					},
					where: {
						Appointment: {
							startTime: {
								gte: thisWeekInterval.start,
								lte: thisWeekInterval.end,
							},
						},
					},
				});
				return thisWeekBookings._count.id;
		}
	} catch (error) {
		return null;
	}
};

export const getBookings = async () => {
	try {
		const bookings = await database.booking.findMany();
		return bookings;
	} catch (error) {
		return [];
	}
};

export const getBookingSubset = async (select: Prisma.BookingSelect) => {
	try {
		const bookings = await database.booking.findMany({
			select,
		});
		return bookings;
	} catch (error) {
		return [];
	}
};
