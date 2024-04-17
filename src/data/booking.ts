import { Prisma } from '@prisma/client';

import { database } from '@/lib/database';

export const getBookings = async <T extends Prisma.BookingSelect, K extends Prisma.BookingWhereInput>(options: {
	where?: K;
	select: T;
}): Promise<Prisma.BookingGetPayload<{ select: T }>[]> => {
	try {
		const booking = await database.booking.findMany({
			where: options.where,
			select: options.select,
		});
		return booking;
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
		const booking = await database.booking.findUnique({
			where: options.where,
			select: options.select,
		});
		return booking;
	} catch (error) {
		return null;
	}
};

export const deleteUniqueBooking = async <
	K extends Prisma.BookingWhereUniqueInput,
	T extends Prisma.BookingSelect,
>(options: {
	where: K;
	select: T;
}): Promise<Prisma.BookingGetPayload<{ select: T }> | null> => {
	try {
		const booking = await database.booking.delete({
			where: options.where,
			select: options.select,
		});
		return booking;
	} catch (error) {
		return null;
	}
};

export const aggregateBookings = async <
	K extends Prisma.BookingWhereInput,
	T extends Prisma.BookingAggregateArgs,
>(options: {
	where?: K;
	aggregate: T;
}): Promise<Prisma.GetBookingAggregateType<T> | null> => {
	try {
		const { aggregate } = options;
		const aggregation = await database.booking.aggregate({
			where: options.where,
			...aggregate,
		});
		return aggregation;
	} catch (error) {
		return null;
	}
};
