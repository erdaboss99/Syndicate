import { Prisma } from '@prisma/client';

import { AUTO_EXPIRED_BOOKING_DELETION_DEFAULT_VALUE, AUTO_EXPIRED_BOOKING_DELETION_KEY } from '@/constants';
import { database } from '@/lib/database';
import { getWeekIntervalFromDay } from '@/lib/date';

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

export const getAutoBookingDeletionStatus = async () => {
	const autoExpiredBookingDeletion = await database.configuration.findUnique({
		where: {
			name: AUTO_EXPIRED_BOOKING_DELETION_KEY,
		},
	});

	if (!autoExpiredBookingDeletion)
		return (
			await database.configuration.create({
				data: {
					name: AUTO_EXPIRED_BOOKING_DELETION_KEY,
					value: AUTO_EXPIRED_BOOKING_DELETION_DEFAULT_VALUE,
				},
			})
		).value;
	return autoExpiredBookingDeletion.value;
};
