'use server';

import { AuthError } from 'next-auth';
import * as z from 'zod';

import { signIn } from '@/auth';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { LoginSchema } from '@/schemas';

export const loginWithCredentials = async (values: z.infer<typeof LoginSchema>) => {
	const validatedData = LoginSchema.safeParse(values);

	if (!validatedData.success) return { error: 'Invalid data!' };

	const { email, password } = validatedData.data;

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
		return { success: 'Successfully logged in!' };
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
