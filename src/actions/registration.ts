'use server';

import * as z from 'zod';

import {
	ACTION_ACCOUNT_ALREADY_USED_EMAIL_ERROR,
	ACTION_CONFIRMATION_EMAIL_SENT_SUCCESS,
	ACTION_INVALID_PAYLOAD_ERROR,
	PASSWORD_MATCH_VALIDATION,
} from '@/constants';
import { database } from '@/lib/database';
import { hash } from '@/lib/hash';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { RegistrationSchema } from '@/schemas';

export const registration = async (values: z.infer<typeof RegistrationSchema>) => {
	const validatedData = RegistrationSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { name, email, password, confirmPassword } = validatedData.data;

	const existingUser = await database.user.findUnique({
		where: {
			email,
		},
	});
	if (existingUser) return { error: ACTION_ACCOUNT_ALREADY_USED_EMAIL_ERROR };
	if (password !== confirmPassword) return { error: PASSWORD_MATCH_VALIDATION };

	const hashedPassword = await hash(password);
	await database.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	const verificationToken = await generateVerificationToken(email);
	await sendVerificationEmail(name, verificationToken.email, verificationToken.token);
	return { success: ACTION_CONFIRMATION_EMAIL_SENT_SUCCESS };
};
