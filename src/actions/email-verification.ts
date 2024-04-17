'use server';

import { z } from 'zod';

import { TokenVerificationSchema } from '@/schemas';

import {
	ACTION_ACCOUNT_EMAIL_VERIFIED_SUCCESS,
	ACTION_ACCOUNT_WITH_EMAIL_NOT_FOUND_ERROR,
	ACTION_EXPIRED_TOKEN_ERROR,
	ACTION_INVALID_TOKEN_ERROR,
	ACTION_NON_EXISTING_TOKEN_ERROR,
} from '@/constants';
import { getUniqueUser, updateUniqueUser } from '@/data/user';
import { deleteVerificationToken, getUniqueVerificationToken } from '@/data/verificationToken';

export const emailVerification = async (values: z.infer<typeof TokenVerificationSchema>) => {
	const validatedData = TokenVerificationSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_TOKEN_ERROR };

	const { token } = validatedData.data;

	const existingToken = await getUniqueVerificationToken({
		where: { token },
		select: { id: true, expires: true, email: true },
	});

	if (!existingToken) return { error: ACTION_NON_EXISTING_TOKEN_ERROR };

	const hasExpired = new Date(existingToken.expires) < new Date();
	if (hasExpired) return { error: ACTION_EXPIRED_TOKEN_ERROR };

	const existingUser = await getUniqueUser({ where: { email: existingToken.email }, select: { id: true } });
	if (!existingUser) return { error: ACTION_ACCOUNT_WITH_EMAIL_NOT_FOUND_ERROR };

	await updateUniqueUser({
		where: { id: existingUser.id },
		data: { emailVerified: new Date(), email: existingToken.email },
		select: { id: true },
	});

	await deleteVerificationToken({ where: { id: existingToken.id }, select: { id: true } });

	return { success: ACTION_ACCOUNT_EMAIL_VERIFIED_SUCCESS };
};
