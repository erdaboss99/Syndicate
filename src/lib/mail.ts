import { render } from '@react-email/render';
import nodemailer from 'nodemailer';

import { env } from '@/env.mjs';
import { formatDate } from '@/lib/date';

import AppointmentDeletionTemplate, { type AppointmentDeletionTemplateProps } from '@/emails/AppointmentDeletion';
import AppointmentGenerationTemplate, { type AppointmentGenerationTemplateProps } from '@/emails/AppointmentGeneration';
import BookingConfirmationTemplate, { type BookingConfirmationTemplateProps } from '@/emails/BookingConfirmation';
import EmailVerificationTemplate from '@/emails/EmailVerification';
import PasswordResetTemplate from '@/emails/PasswordReset';

type EmailTemplate = Parameters<typeof render>[0];

const initTransporter = () => {
	return nodemailer.createTransport({
		service: env.MAIL_SERVICE,
		auth: {
			user: env.MAIL_USER,
			pass: env.MAIL_PASSWORD,
		},
	});
};

const renderTemplate = (templateComponent: EmailTemplate) => {
	return render(templateComponent);
};

const sendEmail = async (options: { recipients: string[]; emailSubject: string; emailTemplate: EmailTemplate }) => {
	const { recipients, emailSubject, emailTemplate } = options;

	const renderedHTMLEmail = renderTemplate(emailTemplate);

	const transporter = initTransporter();

	await transporter.sendMail({ from: env.MAIL_FROM, to: recipients, subject: emailSubject, html: renderedHTMLEmail });

	transporter.close();
};

export const sendPasswordResetEmail = async (userName: string, userEmail: string, passwordResetToken: string) => {
	const passwordResetLink = `${env.BASE_URL}/auth/reset-password?token=${passwordResetToken}`;

	await sendEmail({
		recipients: [userEmail],
		emailSubject: 'Syndicate - Reset your password',
		emailTemplate: PasswordResetTemplate({ userName, passwordResetLink }),
	});
};

export const sendVerificationEmail = async (userName: string, userEmail: string, emailVerificationToken: string) => {
	const emailVerificationLink = `${env.BASE_URL}/auth/email-verification?token=${emailVerificationToken}`;

	await sendEmail({
		recipients: [userEmail],
		emailSubject: 'Syndicate - Confirm your email address',
		emailTemplate: EmailVerificationTemplate({ userName, emailVerificationLink }),
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
	await sendEmail({
		recipients: [env.REPORT_RECIPIENT],
		emailSubject: `Syndicate - Appointment generation report ${formatDate(new Date(), 'yyyy-MM-dd')}`,
		emailTemplate: AppointmentGenerationTemplate({
			message,
			intervalStart,
			intervalEnd,
			workDaysInInterval,
			weekendDaysInInterval,
			createdAppointments,
		}),
	});
};

export const sendAppointmentDeletionReport = async ({
	message,
	deletedAppointments,
}: AppointmentDeletionTemplateProps) => {
	await sendEmail({
		recipients: [env.REPORT_RECIPIENT],
		emailSubject: `Syndicate - Appointment deletion report ${formatDate(new Date(), 'yyyy-MM-dd')}`,
		emailTemplate: AppointmentDeletionTemplate({
			message,
			deletedAppointments,
		}),
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
	await sendEmail({
		recipients: [userEmail],
		emailSubject: `Syndicate - Booking confirmation - ${formatDate(appointmentStartTime, 'shortDateTime')}`,
		emailTemplate: BookingConfirmationTemplate({
			userName,
			userEmail,
			appointmentStartTime,
			bookingDescription,
			issueName,
			issueDescription,
			bookingConfirmationDate,
		}),
	});
};
