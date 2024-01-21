import EmailVerification from '@/emails/EmailVerification';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (name: string, email: string, token: string) => {
	const confirmationLink = `${process.env.BASE_URL}/auth/new-verification?token=${token}`;
	const sender = process.env.EMAIL_FROM as string;
	const recipient = `${name} <${email}>`;

	await resend.emails.send({
		from: sender,
		to: [recipient],
		subject: 'Confirm your email address',
		react: EmailVerification({ name: name, confirmationLink: confirmationLink }),
	});
};
