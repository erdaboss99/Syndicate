import { Prisma } from '@prisma/client';

import { database } from '@/lib/database';
import { getWeekIntervalFromDay } from '@/lib/date';

export const getBookings = async <T extends Prisma.BookingSelect, K extends Prisma.BookingWhereInput>(options: {
	where?: K;
	select: T;
}): Promise<Prisma.BookingGetPayload<{ select: T }>[]> => {
	try {
		const bookingData = await database.booking.findMany({
			where: options.where,
			select: options.select,
		});
		return bookingData;
	} catch (error) {
		return [];
	}
};

export const getUniqueBooking = async <
	K extends Prisma.BookingWhereUniqueInput,
	T extends Prisma.BookingSelect,
>(options: {
	where: K;
	select: T;
}): Promise<Prisma.BookingGetPayload<{ select: T }> | null> => {
	try {
		const bookingData = await database.booking.findUnique({
			where: options.where,
			select: options.select,
		});
		return bookingData;
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
