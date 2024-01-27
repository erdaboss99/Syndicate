import { database } from '@/lib/database';

export const getAccountByUserId = async (id: string) => {
	try {
		const account = await database.account.findFirst({
			where: { userId: id },
		});

		return account;
	} catch {
		return null;
	}
};
