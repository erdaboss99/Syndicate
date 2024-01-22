'use server';

import * as z from 'zod';

import { RequestPasswordResetSchema } from '@/schemas';

import { getUserByEmail } from '@/data/user';

import { generatePasswordResetToken } from '@/lib/tokens';

import { sendPasswordResetEmail } from '@/lib/mail';

export const requestPasswordReset = async (values: z.infer<typeof RequestPasswordResetSchema>) => {
	const validatedData = RequestPasswordResetSchema.safeParse(values);
	if (!validatedData.success) return { error: 'Invalid data!' };

	const { email } = validatedData.data;

	const existingUser = await getUserByEmail(email);
	if (!existingUser || !existingUser.name) return { error: 'Email does not exist!' };
	if (!existingUser.password) return { error: 'This account was created using a third-party provider!' };

	const passwordResetToken = await generatePasswordResetToken(email);
	await sendPasswordResetEmail(existingUser.name, passwordResetToken.email, passwordResetToken.token);

	return { success: 'Password reset email sent!' };
};
