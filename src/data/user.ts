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

export const getUserCount = async (options: { variant: 'ALL' | 'LASTWEEK' }) => {
	try {
		switch (options.variant) {
			case 'ALL':
				const userCount = await database.user.aggregate({
					_count: {
						id: true,
					},
				});
				return userCount._count.id;
			case 'LASTWEEK':
				const registeredInLastWeekCount = await database.user.aggregate({
					_count: {
						id: true,
					},
					where: {
						createdAt: {
							gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
						},
					},
				});
				return registeredInLastWeekCount._count.id;
		}
	} catch (error) {
		return null;
	}
};
