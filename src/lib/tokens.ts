import { v4 as uuid } from 'uuid';

import { EMAIL_VERIFICATION_TOKEN_EXPIRY, PASSWORD_RESET_TOKEN_EXPIRY } from '@/constants';

import { getPasswordResetTokenByEmail } from '@/data/passwordResetToken';
import { getVerificationTokenByEmail } from '@/data/verificationToken';
import { database } from '@/lib/database';

export const generateVerificationToken = async (email: string) => {
	const token = uuid();
	const expires = new Date(new Date().getTime() + EMAIL_VERIFICATION_TOKEN_EXPIRY * 60000);

	const existingToken = await getVerificationTokenByEmail(email);
	if (existingToken) await database.verificationToken.delete({ where: { id: existingToken.id } });

	const verificationToken = await database.verificationToken.create({
		data: {
			email,
			token,
			expires,
		},
	});
	return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
	const token = uuid();
	const expires = new Date(new Date().getTime() + PASSWORD_RESET_TOKEN_EXPIRY * 60000);

	const existingToken = await getPasswordResetTokenByEmail(email);
	if (existingToken) await database.passwordResetToken.delete({ where: { id: existingToken.id } });

	const passwordResetToken = await database.passwordResetToken.create({
		data: {
			email,
			token,
			expires,
		},
	});
	return passwordResetToken;
};
