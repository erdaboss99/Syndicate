'use server';

import { AuthError } from 'next-auth';
import * as z from 'zod';

import { signIn } from '@/auth';
import {
	ACTION_CONFIRMATION_EMAIL_SENT_SUCCESS,
	ACTION_DEFAULT_ERROR,
	ACTION_INVALID_PAYLOAD_ERROR,
	ACTION_LOGIN_INVALID_CREDENTIALS_ERROR,
	ACTION_LOGIN_INVALID_EMAIL_OR_PASSWORD_ERROR,
} from '@/constants';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';

export const loginWithCredentials = async (values: z.infer<typeof LoginSchema>) => {
	const validatedData = LoginSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { email, password } = validatedData.data;

	const existingUser = await getUserByEmail(email);
	if (!existingUser || !existingUser.email || !existingUser.password || !existingUser.name)
		return { error: ACTION_LOGIN_INVALID_CREDENTIALS_ERROR };

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(existingUser.email);
		await sendVerificationEmail(existingUser.name, verificationToken.email, verificationToken.token);
		return { success: ACTION_CONFIRMATION_EMAIL_SENT_SUCCESS };
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
					return { error: ACTION_LOGIN_INVALID_EMAIL_OR_PASSWORD_ERROR };
				default:
					return { error: ACTION_DEFAULT_ERROR };
			}
		throw error;
	}
};
