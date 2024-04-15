import { Prisma } from '@prisma/client';

import { database } from '@/lib/database';

export const getUserByEmail = async (email: string) => {
	try {
		const user = await database.user.findUnique({ where: { email } });
		return user;
	} catch (error) {
		return null;
	}
};

export const getUserById = async (id: string) => {
	try {
		const user = await database.user.findUnique({ where: { id } });
		return user;
	} catch (error) {
		return null;
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

export const getUserDataSubset = async <T extends Prisma.UserSelect>(
	select: T,
): Promise<Prisma.UserGetPayload<{ select: T }>[]> => {
	try {
		const userSubset = await database.user.findMany({
			select,
		});
		return userSubset;
	} catch (error) {
		return [];
	}
};

export const getSelectedUserDataSubset = async <T extends Prisma.UserSelect>(options: {
	id: string;
	select: T;
}): Promise<Prisma.UserGetPayload<{ select: T }> | null> => {
	try {
		const userData = await database.user.findFirst({
			where: { id: options.id },
			select: options.select,
		});
		return userData;
	} catch (error) {
		return null;
	}
};
