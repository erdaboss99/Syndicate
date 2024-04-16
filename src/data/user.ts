import { Prisma } from '@prisma/client';

import { database } from '@/lib/database';

export const getUniqueUser = async <K extends Prisma.UserWhereUniqueInput, T extends Prisma.UserSelect>(options: {
	where: K;
	select: T;
}): Promise<Prisma.UserGetPayload<{ select: T }> | null> => {
	try {
		const user = await database.user.findUnique({
			where: options.where,
			select: options.select,
		});
		return user;
	} catch (error) {
		return null;
	}
};

export const getUser = async <K extends Prisma.UserWhereInput, T extends Prisma.UserSelect>(options: {
	where: K;
	select: T;
}): Promise<Prisma.UserGetPayload<{ select: T }> | null> => {
	try {
		const user = await database.user.findFirst({
			where: options.where,
			select: options.select,
		});
		return user;
	} catch (error) {
		return null;
	}
};

export const getUsers = async <K extends Prisma.UserWhereInput, T extends Prisma.UserSelect>(options: {
	where?: K;
	select: T;
}): Promise<Prisma.UserGetPayload<{ select: T }>[]> => {
	try {
		const user = await database.user.findMany({
			where: options.where,
			select: options.select,
		});
		return user;
	} catch (error) {
		return [];
	}
};

export const aggregateUsers = async <K extends Prisma.UserWhereInput, T extends Prisma.UserAggregateArgs>(options: {
	where?: K;
	aggregate: T;
}): Promise<Prisma.GetUserAggregateType<T> | null> => {
	try {
		const { aggregate } = options;
		const aggregation = await database.user.aggregate({
			where: options.where,
			...aggregate,
		});
		return aggregation;
	} catch (error) {
		return null;
	}
};
