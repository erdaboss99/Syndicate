'use server';

import * as z from 'zod';

import {
	ACTION_ACCOUNT_PASSWORD_UPDATED_SUCCESS,
	ACTION_ACCOUNT_WITH_EMAIL_NOT_FOUND_ERROR,
	ACTION_EXPIRED_TOKEN_ERROR,
	ACTION_INVALID_PAYLOAD_ERROR,
	ACTION_INVALID_TOKEN_ERROR,
	PASSWORD_MATCH_VALIDATION,
} from '@/constants';
import { getUniquePasswordResetToken } from '@/data/passwordResetToken';
import { getUniqueUser } from '@/data/user';
import { database } from '@/lib/database';
import { hash } from '@/lib/hash';
import { ResetPasswordSchema } from '@/schemas';

export const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
	const validatedData = ResetPasswordSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { token, password, confirmPassword } = validatedData.data;

	const existingToken = await getUniquePasswordResetToken({
		where: { id: token },
		select: {
			id: true,
			expires: true,
			email: true,
		},
	});
	if (!existingToken) return { error: ACTION_INVALID_TOKEN_ERROR };

	const hasExpired = new Date(existingToken.expires) < new Date();
	if (hasExpired) return { error: ACTION_EXPIRED_TOKEN_ERROR };

	const existingUser = await getUniqueUser({
		where: { email: existingToken.email },
		select: { id: true },
	});
	if (!existingUser) return { error: ACTION_ACCOUNT_WITH_EMAIL_NOT_FOUND_ERROR };

	if (password !== confirmPassword) return { error: PASSWORD_MATCH_VALIDATION };

	const hashedPassword = await hash(password);
	await database.user.update({
		where: {
			id: existingUser.id,
		},
		data: {
			password: hashedPassword,
		},
	});
	await database.passwordResetToken.delete({
		where: {
			id: existingToken.id,
		},
	});

	return { success: ACTION_ACCOUNT_PASSWORD_UPDATED_SUCCESS };
};
