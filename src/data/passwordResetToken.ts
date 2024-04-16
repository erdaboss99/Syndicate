import { Prisma } from '@prisma/client';

import { database } from '@/lib/database';

export const getUniquePasswordResetToken = async <
	K extends Prisma.PasswordResetTokenWhereUniqueInput,
	T extends Prisma.PasswordResetTokenSelect,
>(options: {
	where: K;
	select: T;
}): Promise<Prisma.PasswordResetTokenGetPayload<{ select: T }> | null> => {
	try {
		const passwordResetToken = await database.passwordResetToken.findUnique({
			where: options.where,
			select: options.select,
		});
		return passwordResetToken;
	} catch (error) {
		return null;
	}
};

export const getPasswordResetToken = async <
	K extends Prisma.PasswordResetTokenWhereInput,
	T extends Prisma.PasswordResetTokenSelect,
>(options: {
	where: K;
	select: T;
}): Promise<Prisma.PasswordResetTokenGetPayload<{ select: T }> | null> => {
	try {
		const passwordResetToken = await database.passwordResetToken.findFirst({
			where: options.where,
			select: options.select,
		});
		return passwordResetToken;
	} catch (error) {
		return null;
	}
};
