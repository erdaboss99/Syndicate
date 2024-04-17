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

export const createUniquePasswordResetToken = async <
	D extends Prisma.PasswordResetTokenCreateInput,
	T extends Prisma.PasswordResetTokenSelect,
>(options: {
	data: D;
	select: T;
}): Promise<Prisma.PasswordResetTokenGetPayload<{ select: T }> | null> => {
	try {
		const passwordResetToken = await database.passwordResetToken.create({
			data: options.data,
			select: options.select,
		});
		return passwordResetToken;
	} catch (error) {
		return null;
	}
};

export const deletePasswordResetToken = async <
	K extends Prisma.PasswordResetTokenWhereUniqueInput,
	T extends Prisma.PasswordResetTokenSelect,
>(options: {
	where: K;
	select: T;
}): Promise<Prisma.PasswordResetTokenGetPayload<{ select: T }> | null> => {
	try {
		const passwordResetToken = await database.passwordResetToken.delete({
			where: options.where,
			select: options.select,
		});
		return passwordResetToken;
	} catch (error) {
		return null;
	}
};
