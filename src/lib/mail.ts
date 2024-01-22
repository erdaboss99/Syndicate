import { Resend } from 'resend';

import { env } from '@/env.mjs';

import EmailVerification from '@/emails/EmailVerification';
import PasswordReset from '@/emails/PasswordReset';

const resend = new Resend(env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (name: string, email: string, token: string) => {
	const resetLink = `${env.BASE_URL}/auth/new-password?token=${token}`;
	const sender = env.EMAIL_FROM;
	const recipient = email;

	await resend.emails.send({
		from: sender,
		to: [recipient],
		subject: 'Syndicate - Reset your password',
		react: PasswordReset({ name: name, resetLink: resetLink }),
	});
};

export const sendVerificationEmail = async (name: string, email: string, token: string) => {
	const confirmationLink = `${env.BASE_URL}/auth/new-verification?token=${token}`;
	const sender = env.EMAIL_FROM;
	const recipient = email;

	await resend.emails.send({
		from: sender,
		to: [recipient],
		subject: 'Syndicate - Confirm your email address',
		react: EmailVerification({ name: name, confirmationLink: confirmationLink }),
	});
};
