import { database } from '@/lib/database';

export const getPasswordResetTokenByToken = async (token: string) => {
	try {
		const passwordResetToken = await database.passwordResetToken.findUnique({ where: { token } });
		return passwordResetToken;
	} catch (error) {
		return null;
	}
};

export const getPasswordResetTokenByEmail = async (email: string) => {
	try {
		const passwordResetToken = await database.passwordResetToken.findFirst({ where: { email } });
		return passwordResetToken;
	} catch (error) {
		return null;
	}
};
