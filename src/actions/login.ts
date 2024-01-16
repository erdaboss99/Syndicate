'use server';

import { AuthError } from 'next-auth';
import * as z from 'zod';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';

export const loginWithCredentials = async (
	values: z.infer<typeof LoginSchema>,
): Promise<{ success: boolean; message: string }> => {
	const validatedData = LoginSchema.safeParse(values);

	if (!validatedData.success) return { success: false, message: 'Invalid data!' };

	const { email, password } = validatedData.data;

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
		return { success: true, message: 'Successfully logged in!' };
	} catch (error) {
		if (error instanceof AuthError)
			switch (error.type) {
				case 'CredentialsSignin':
					return { success: false, message: 'Invalid email or password!' };
				default:
					return { success: false, message: 'Something went wrong!' };
			}
		throw error;
	}
};
