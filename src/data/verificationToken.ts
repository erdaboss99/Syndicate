import { Prisma } from '@prisma/client';

import { database } from '@/lib/database';

export const getVerificationTokenByToken = async (token: string) => {
	try {
		const verificationToken = await database.verificationToken.findUnique({
			where: { token },
		});

		return verificationToken;
	} catch (error) {
		return null;
	}
};

export const getUniqueVerificationToken = async <
	K extends Prisma.VerificationTokenWhereUniqueInput,
	T extends Prisma.VerificationTokenSelect,
>(options: {
	where: K;
	select: T;
}): Promise<Prisma.VerificationTokenGetPayload<{ select: T }> | null> => {
	try {
		const verificationToken = await database.verificationToken.findUnique({
			where: options.where,
			select: options.select,
		});
		return verificationToken;
	} catch (error) {
		return null;
	}
};

export const getVerificationToken = async <
	K extends Prisma.VerificationTokenWhereInput,
	T extends Prisma.VerificationTokenSelect,
>(options: {
	where: K;
	select: T;
}): Promise<Prisma.VerificationTokenGetPayload<{ select: T }> | null> => {
	try {
		const verificationToken = await database.verificationToken.findFirst({
			where: options.where,
			select: options.select,
		});
		return verificationToken;
	} catch (error) {
		return null;
	}
};
