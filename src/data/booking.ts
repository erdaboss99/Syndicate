import { AUTO_BOOKING_DELETION_DEFAULT_VALUE, AUTO_BOOKING_DELETION_KEY } from '@/constants';
import { database } from '@/lib/database';
import { getWeekIntervalFromDay } from '@/lib/date';
import { Prisma } from '@prisma/client';

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
			name: AUTO_BOOKING_DELETION_KEY,
		},
	});

	if (!autoExpiredBookingDeletion)
		return (
			await database.configuration.create({
				data: {
					name: AUTO_BOOKING_DELETION_KEY,
					value: AUTO_BOOKING_DELETION_DEFAULT_VALUE,
				},
			})
		).value;
	return autoExpiredBookingDeletion.value;
};
