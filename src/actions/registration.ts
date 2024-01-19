'use server';

import bcrypt from 'bcryptjs';
import * as z from 'zod';

import { database } from '@/lib/prisma';

import { RegistrationSchema } from '@/schemas';

export const registration = async (values: z.infer<typeof RegistrationSchema>) => {
	const validatedData = RegistrationSchema.safeParse(values);

	if (!validatedData.success) return { error: 'Invalid data!' };

	const { name, email, password } = validatedData.data;

	const existingUser = await database.user.findUnique({
		where: {
			email,
		},
	});
	if (existingUser) return { error: 'This email is already taken!' };

	const hashedPassword = await bcrypt.hash(password, 10);
	await database.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	// TODO: Send verification email token

	return { success: 'Account successfully created!' };
};
