'use server';

import * as z from 'zod';

import {
	ACTION_ACCOUNT_THIRD_PARTY_EDIT_ERROR,
	ACTION_INVALID_PAYLOAD_ERROR,
	ACTION_NON_EXISTING_TOKEN_ERROR,
	ACTION_PASSWORD_RESET_EMAIL_SENT_SUCCESS,
} from '@/constants';
import { getUniqueUser } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';
import { RequestPasswordResetSchema } from '@/schemas';

export const requestPasswordReset = async (values: z.infer<typeof RequestPasswordResetSchema>) => {
	const validatedData = RequestPasswordResetSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { email } = validatedData.data;

	const existingUser = await getUniqueUser({
		where: { email },
		select: { name: true, password: true },
	});
	if (!existingUser || !existingUser.name) return { error: ACTION_NON_EXISTING_TOKEN_ERROR };
	if (!existingUser.password) return { error: ACTION_ACCOUNT_THIRD_PARTY_EDIT_ERROR };

	const passwordResetToken = await generatePasswordResetToken(email);
	await sendPasswordResetEmail(existingUser.name, passwordResetToken.email, passwordResetToken.token);

	return { success: ACTION_PASSWORD_RESET_EMAIL_SENT_SUCCESS };
};
