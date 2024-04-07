import { database } from '@/lib/database';
import { Prisma } from '@prisma/client';

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

export const getUserCount = async (variant: 'all' | 'lastWeek') => {
	try {
		switch (variant) {
			case 'all':
				const userCount = await database.user.aggregate({
					_count: {
						id: true,
					},
				});
				return userCount._count.id;
			case 'lastWeek':
				const registeredInLastWeek = await database.user.aggregate({
					_count: {
						id: true,
					},
					where: {
						createdAt: {
							gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
						},
					},
				});
				return registeredInLastWeek._count.id;
		}
	} catch (error) {
		return null;
	}
};

export const getUserSubset = async (select: Prisma.UserSelect) => {
	try {
		const users = await database.user.findMany({
			select,
		});
		return users;
	} catch (error) {
		return [];
	}
};
