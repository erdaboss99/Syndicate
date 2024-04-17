import { v4 as uuid } from 'uuid';

import { EMAIL_VERIFICATION_TOKEN_EXPIRY, PASSWORD_RESET_TOKEN_EXPIRY } from '@/constants';

import {
	createUniquePasswordResetToken,
	deletePasswordResetToken,
	getPasswordResetToken,
} from '@/data/passwordResetToken';
import { createUniqueVerificationToken, deleteVerificationToken, getVerificationToken } from '@/data/verificationToken';

export const generateVerificationToken = async (email: string) => {
	const token = uuid();
	const expires = new Date(new Date().getTime() + EMAIL_VERIFICATION_TOKEN_EXPIRY * 60000);

	const existingToken = await getVerificationToken({
		where: { email },
		select: { id: true },
	});

	if (existingToken) await deleteVerificationToken({ where: { id: existingToken.id }, select: { id: true } });

	const verificationToken = await createUniqueVerificationToken({
		data: { email, token, expires },
		select: { id: true, email: true, token: true, expires: true, issuedAt: true },
	});
	return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
	const token = uuid();
	const expires = new Date(new Date().getTime() + PASSWORD_RESET_TOKEN_EXPIRY * 60000);

	const existingToken = await getPasswordResetToken({
		where: { email },
		select: { id: true },
	});
	if (existingToken) await deletePasswordResetToken({ where: { id: existingToken.id }, select: { id: true } });

	const passwordResetToken = await createUniquePasswordResetToken({
		data: { email, token, expires },
		select: { id: true, email: true, token: true, expires: true, issuedAt: true },
	});
	return passwordResetToken;
};
