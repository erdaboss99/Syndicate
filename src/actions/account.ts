'use server';

import * as z from 'zod';

import {
	ACTION_ACCOUNT_ALREADY_USED_EMAIL_ERROR,
	ACTION_ACCOUNT_DELETED_SUCCESS,
	ACTION_ACCOUNT_INCORRECT_EMAIL_ERROR,
	ACTION_ACCOUNT_INCORRECT_PASSWORD_ERROR,
	ACTION_ACCOUNT_NOT_FOUND_ERROR,
	ACTION_ACCOUNT_ROLE_CHANGE_SUCCESS,
	ACTION_ACCOUNT_THIRD_PARTY_EDIT_ERROR,
	ACTION_ACCOUNT_UPDATED_SUCCESS,
	ACTION_INVALID_PAYLOAD_ERROR,
	ACTION_ONLY_ADMIN_ERROR,
} from '@/constants';
import { getUserByEmail, getUserById } from '@/data/user';
import { getCurrentUser } from '@/lib/auth';
import { database } from '@/lib/database';
import { compare, hash } from '@/lib/hash';
import { AccountDeleteSchema, AccountEditSchema, RoleChangeSchema } from '@/schemas';

export const editAccount = async (values: z.infer<typeof AccountEditSchema>) => {
	const validatedData = AccountEditSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const user = await getCurrentUser();
	const isOAuth = user?.provider !== 'Credentials';
	if (isOAuth) return { error: ACTION_ACCOUNT_THIRD_PARTY_EDIT_ERROR };

	const { name, email, newPassword, confirmPassword, password } = validatedData.data;

	const existingUser = await getUserById(user?.id);
	if (!existingUser || !existingUser.email || !existingUser.password || !existingUser.name)
		return { error: ACTION_ACCOUNT_NOT_FOUND_ERROR };

	const passwordMatch = await compare({ data: password, hashedData: existingUser.password });
	if (!passwordMatch) return { error: ACTION_ACCOUNT_INCORRECT_PASSWORD_ERROR };

	const emailChanged = email !== existingUser.email;
	if (emailChanged) {
		const emailConflicts = await getUserByEmail(email);
		if (emailConflicts) return { error: ACTION_ACCOUNT_ALREADY_USED_EMAIL_ERROR };
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

	return { success: ACTION_ACCOUNT_UPDATED_SUCCESS };
};

export const deleteAccount = async (values: z.infer<typeof AccountDeleteSchema>) => {
	const validatedData = AccountDeleteSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { email } = validatedData.data;

	const user = await getCurrentUser();
	const existingUser = await getUserById(user?.id!);

	if (!existingUser || !existingUser.email) return { error: ACTION_ACCOUNT_NOT_FOUND_ERROR };

	if (existingUser.email !== email) return { error: ACTION_ACCOUNT_INCORRECT_EMAIL_ERROR };

	await database.user.delete({ where: { id: existingUser.id } });
	return { success: ACTION_ACCOUNT_DELETED_SUCCESS };
};

export const changeRole = async (values: z.infer<typeof RoleChangeSchema>) => {
	const user = await getCurrentUser();
	if (user?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const validatedData = RoleChangeSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { id } = validatedData.data;
	const existingUser = await getUserById(id);
	if (!existingUser) return { error: ACTION_ACCOUNT_NOT_FOUND_ERROR };

	const { role } = validatedData.data;
	await database.user.update({
		where: {
			id,
		},
		data: {
			role: role,
		},
	});
	return { success: ACTION_ACCOUNT_ROLE_CHANGE_SUCCESS };
};
