import { render } from '@react-email/render';
import nodemailer from 'nodemailer';

import { env } from '@/env.mjs';
import { formatDate } from '@/lib/date';

import AppointmentDeletionTemplate, { type AppointmentDeletionTemplateProps } from '@/emails/AppointmentDeletion';
import AppointmentGenerationTemplate, { type AppointmentGenerationTemplateProps } from '@/emails/AppointmentGeneration';
import BookingConfirmationTemplate, { type BookingConfirmationTemplateProps } from '@/emails/BookingConfirmation';
import EmailVerificationTemplate from '@/emails/EmailVerification';
import PasswordResetTemplate from '@/emails/PasswordReset';

const initTransporter = () => {
	return nodemailer.createTransport({
		service: env.MAIL_SERVICE,
		auth: {
			user: env.MAIL_USER,
			pass: env.MAIL_PASSWORD,
		},
	});
};

const sendEmail = async (options: { recipients: string[]; emailSubject: string; emailHTML: string }) => {
	const { recipients, emailSubject, emailHTML } = options;
	const transporter = initTransporter();

	await transporter.sendMail({ from: env.MAIL_FROM, to: recipients, subject: emailSubject, html: emailHTML });

	transporter.close();
};

export const sendPasswordResetEmail = async (userName: string, userEmail: string, passwordResetToken: string) => {
	const passwordResetLink = `${env.BASE_URL}/auth/reset-password?token=${passwordResetToken}`;

	const passwordResetEmail = render(PasswordResetTemplate({ userName, passwordResetLink }));

	await sendEmail({
		recipients: [userEmail],
		emailSubject: 'Syndicate - Reset your password',
		emailHTML: passwordResetEmail,
	});
};

export const sendVerificationEmail = async (userName: string, userEmail: string, emailVerificationToken: string) => {
	const emailVerificationLink = `${env.BASE_URL}/auth/email-verification?token=${emailVerificationToken}`;

	const verificationEmail = render(EmailVerificationTemplate({ userName, emailVerificationLink }));

	await sendEmail({
		recipients: [userEmail],
		emailSubject: 'Syndicate - Confirm your email address',
		emailHTML: verificationEmail,
	});
};

export const sendAppointmentGenerationReport = async ({
	message,
	intervalStart,
	intervalEnd,
	workDaysInInterval,
	weekendDaysInInterval,
	createdAppointments,
}: AppointmentGenerationTemplateProps) => {
	const recipient = env.REPORT_RECIPIENT;
	const currentTime = formatDate(new Date(), 'yyyy-MM-dd');

	const appointmentGenerationEmail = render(
		AppointmentGenerationTemplate({
			message,
			intervalStart,
			intervalEnd,
			workDaysInInterval,
			weekendDaysInInterval,
			createdAppointments,
		}),
	);

	await sendEmail({
		recipients: [recipient],
		emailSubject: `Syndicate - Appointment generation report ${currentTime}`,
		emailHTML: appointmentGenerationEmail,
	});
};

export const sendAppointmentDeletionReport = async ({
	message,
	deletedAppointments,
}: AppointmentDeletionTemplateProps) => {
	const recipient = env.REPORT_RECIPIENT;
	const currentTime = formatDate(new Date(), 'yyyy-MM-dd');

	const appointmentDeletionEmail = render(
		AppointmentDeletionTemplate({
			message,
			deletedAppointments,
		}),
	);

	await sendEmail({
		recipients: [recipient],
		emailSubject: `Syndicate - Appointment deletion report ${currentTime}`,
		emailHTML: appointmentDeletionEmail,
	});
};

export const sendBookingConfirmationEmail = async ({
	userName,
	userEmail,
	appointmentStartTime,
	bookingDescription,
	issueName,
	issueDescription,
	bookingConfirmationDate,
}: BookingConfirmationTemplateProps) => {
	const bookingConfirmationEmail = render(
		BookingConfirmationTemplate({
			userName,
			userEmail,
			appointmentStartTime,
			bookingDescription,
			issueName,
			issueDescription,
			bookingConfirmationDate,
		}),
	);

	await sendEmail({
		recipients: [userEmail],
		emailSubject: 'Syndicate - Booking confirmation',
		emailHTML: bookingConfirmationEmail,
	});
};
