import { Prisma } from '@prisma/client';

import { database } from '@/lib/database';

export const getUniqueAccountDataSubset = async <
	K extends Prisma.AccountWhereUniqueInput,
	T extends Prisma.AccountSelect,
>(options: {
	where: K;
	select: T;
}): Promise<Prisma.AccountGetPayload<{ select: T }> | null> => {
	try {
		const accountData = await database.account.findUnique({
			where: options.where,
			select: options.select,
		});
		return accountData;
	} catch (error) {
		return null;
	}
};
