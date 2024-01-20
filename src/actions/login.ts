'use server';

import { AuthError } from 'next-auth';
import * as z from 'zod';

import { signIn } from '@/auth';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { LoginSchema } from '@/schemas';

import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';

export const loginWithCredentials = async (values: z.infer<typeof LoginSchema>) => {
	const validatedData = LoginSchema.safeParse(values);

	if (!validatedData.success) return { error: 'Invalid data!' };

	const { email, password } = validatedData.data;

	const user = await getUserByEmail(email);

	if (!user || !user.email || !user.password) return { error: 'Invalid credentials!' };

	if (!user.emailVerified) {
		const verificationToken = await generateVerificationToken(user.email);

		return { success: 'Confirmation email sent!' };
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError)
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid email or password!' };
				default:
					return { error: 'Something went wrong!' };
			}
		throw error;
	}
};
