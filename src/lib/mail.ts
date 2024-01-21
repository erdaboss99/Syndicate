import EmailVerification from '@/emails/EmailVerification';
import { Resend } from 'resend';

import { env } from '@/env.mjs';

const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationEmail = async (name: string, email: string, token: string) => {
	const confirmationLink = `${env.BASE_URL}/auth/new-verification?token=${token}`;
	const sender = env.EMAIL_FROM;
	const recipient = email;

	await resend.emails.send({
		from: sender,
		to: [recipient],
		subject: 'Confirm your email address',
		react: EmailVerification({ name: name, confirmationLink: confirmationLink }),
	});
};
