'use server';

import * as z from 'zod';

import { RequestPasswordResetSchema } from '@/schemas';

import { getUserByEmail } from '@/data/user';

export const requestPasswordReset = async (values: z.infer<typeof RequestPasswordResetSchema>) => {
	const validatedData = RequestPasswordResetSchema.safeParse(values);
	if (!validatedData.success) return { error: 'Invalid data!' };

	const { email } = validatedData.data;

	const existingUser = await getUserByEmail(email);
	if (!existingUser) return { error: 'Email does not exist!' };

	// TODO: Generate token and Send email

	return { success: 'Password reset email sent!' };
};
