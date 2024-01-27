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

export const getUserProviderById = async (id: string) => {
	try {
		const provider = await database.account.findFirst({ where: { userId: id }, select: { provider: true } });
		return provider;
	} catch (error) {
		return null;
	}
};
