'use server';

import * as z from 'zod';

import { getCurrentUser } from '@/lib/auth';

import { compare, hash } from '@/lib/hash';

import { database } from '@/lib/database';

import { getUserByEmail, getUserById } from '@/data/user';

import { AccountDeleteSchema, AccountEditSchema, RoleChangeSchema } from '@/schemas';

export const editAccount = async (values: z.infer<typeof AccountEditSchema>) => {
	const validatedData = AccountEditSchema.safeParse(values);
	if (!validatedData.success) return { error: 'Invalid data!' };

	const user = await getCurrentUser();
	const isOAuth = user?.provider !== 'Credentials';
	if (isOAuth) return { error: 'User data cannot be changed in accounts created using a third-party provider!' };

	const { name, email, newPassword, confirmPassword, password } = validatedData.data;

	const existingUser = await getUserById(user?.id);
	if (!existingUser || !existingUser.email || !existingUser.password || !existingUser.name)
		return { error: 'User no longed exists!' };

	const passwordMatch = await compare(password, existingUser.password);
	if (!passwordMatch) return { error: 'Invalid password!' };

	const emailChanged = email !== existingUser.email;
	if (emailChanged) {
		const emailConflicts = await getUserByEmail(email);
		if (emailConflicts) return { error: 'Email already in use!' };
		await database.user.update({
			where: {
				id: user.id,
			},
			data: {
				email,
				emailVerified: null,
			},
		});
	}

	const nameChanged = name !== existingUser.name;
	if (nameChanged) {
		await database.user.update({
			where: {
				id: user.id,
			},
			data: {
				name,
			},
		});
	}

	if (newPassword && confirmPassword) {
		await database.user.update({
			where: {
				id: user.id,
			},
			data: {
				password: await hash(newPassword),
			},
		});
	}

	return { success: 'Account informations updated! Please log in again!' };
};

export const deleteAccount = async (values: z.infer<typeof AccountDeleteSchema>) => {
	const validatedData = AccountDeleteSchema.safeParse(values);
	if (!validatedData.success) return { error: 'Invalid data!' };

	const { email } = validatedData.data;

	const user = await getCurrentUser();
	const existingUser = await getUserById(user?.id!);

	if (!existingUser || !existingUser.email) return { error: 'User no longed exists!' };

	if (existingUser.email !== email) return { error: 'Invalid email!' };

	await database.user.delete({ where: { id: existingUser.id } });
	return { success: 'Account deleted!' };
};

export const changeRole = async (values: z.infer<typeof RoleChangeSchema>) => {
	const validatedData = RoleChangeSchema.safeParse(values);
	if (!validatedData.success) return { error: 'Invalid data!' };

	const user = await getCurrentUser();
	if (user?.role !== 'ADMIN') return { error: 'Role change not allowed!' };

	const { id } = validatedData.data;
	const existingUser = await getUserById(id);
	if (!existingUser) return { error: 'User no longed exists!' };

	const { role } = validatedData.data;
	await database.user.update({
		where: {
			id,
		},
		data: {
			role: role,
		},
	});
	return { success: 'Role changed!' };
};
