'use server';

import bcrypt from 'bcryptjs';
import * as z from 'zod';

import { database } from '@/lib/database';

import { RegistrationSchema } from '@/schemas';

import { generateVerificationToken } from '@/lib/tokens';

import { sendVerificationEmail } from '@/lib/mail';

export const registration = async (values: z.infer<typeof RegistrationSchema>) => {
	const validatedData = RegistrationSchema.safeParse(values);
	if (!validatedData.success) return { error: 'Invalid data!' };

	const { name, email, password, confirmPassword } = validatedData.data;

	const existingUser = await database.user.findUnique({
		where: {
			email,
		},
	});
	if (existingUser) return { error: 'This email is already taken!' };
	if (password !== confirmPassword) return { error: 'Passwords do not match!' };

	const hashedPassword = await bcrypt.hash(password, 10);
	await database.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	const verificationToken = await generateVerificationToken(email);
	await sendVerificationEmail(name, verificationToken.email, verificationToken.token);
	return { success: 'Confirmation email sent!' };
};
