'use server';

import bcrypt from 'bcrypt';
import * as z from 'zod';

import { database } from '@/lib/prisma';

import { RegistrationSchema } from '@/schemas';

export const registration = async (
	values: z.infer<typeof RegistrationSchema>,
): Promise<{ success: boolean; message: string }> => {
	const validatedData = RegistrationSchema.safeParse(values);

	if (!validatedData.success) return { success: false, message: 'Invalid data!' };

	const { name, email, password } = validatedData.data;

	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await database.user.findUnique({
		where: {
			email,
		},
	});

	if (existingUser) return { success: false, message: 'This email is already taken!' };

	await database.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	// TODO: Send verification email token

	return { success: true, message: 'Account successfully created!' };
};
