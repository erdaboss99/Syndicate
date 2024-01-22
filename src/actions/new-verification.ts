'use server';

import { z } from 'zod';

import { TokenVerificationSchema } from '@/schemas';

import { getUserByEmail } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verificationToken';
import { database } from '@/lib/database';

export const newVerification = async (values: z.infer<typeof TokenVerificationSchema>) => {
	const validatedData = TokenVerificationSchema.safeParse(values);
	if (!validatedData.success) return { error: 'Invalid token!' };

	const { token } = validatedData.data;
	const existingToken = await getVerificationTokenByToken(token);
	if (!existingToken) return { error: 'Token does not exist!' };

	const hasExpired = new Date(existingToken.expires) < new Date();
	if (hasExpired) return { error: 'Token has expired!' };

	const existingUser = await getUserByEmail(existingToken.email);
	if (!existingUser) return { error: 'Email does not exist!' };

	await database.user.update({
		where: { id: existingUser.id },
		data: {
			emailVerified: new Date(),
			email: existingToken.email,
		},
	});

	await database.verificationToken.delete({ where: { id: existingToken.id } });

	return { success: 'Email verified!' };
};
