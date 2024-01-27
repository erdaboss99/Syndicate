'use server';

import * as z from 'zod';

import { hash } from '@/lib/hash';

import { getPasswordResetTokenByToken } from '@/data/passwordResetToken';
import { getUserByEmail } from '@/data/user';
import { database } from '@/lib/database';

import { ResetPasswordSchema } from '@/schemas';

export const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
	const validatedData = ResetPasswordSchema.safeParse(values);
	if (!validatedData.success) return { error: 'Invalid data!' };

	const { token, password, confirmPassword } = validatedData.data;

	const existingToken = await getPasswordResetTokenByToken(token);
	if (!existingToken) return { error: 'Invalid token!' };

	const hasExpired = new Date(existingToken.expires) < new Date();
	if (hasExpired) return { error: 'Token has expired!' };

	const existingUser = await getUserByEmail(existingToken.email);
	if (!existingUser) return { error: 'Email does not exist!' };

	if (password !== confirmPassword) return { error: 'Passwords do not match!' };

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

	return { success: 'Password updated!' };
};
