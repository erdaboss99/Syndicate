import { render } from '@react-email/render';
import nodemailer from 'nodemailer';

import { env } from '@/env.mjs';
import { formatDate } from '@/lib/date';

import AccountDeletionTemplate, { AccountDeletionTemplateProps } from '@/emails/AccountDelete';
import BookingCancellationTemplate, { BookingCancellationTemplateProps } from '@/emails/BookingCancellation';
import BookingConfirmationTemplate, { type BookingConfirmationTemplateProps } from '@/emails/BookingConfirmation';
import BookingDeletionTemplate, { BookingDeletionTemplateProps } from '@/emails/BookingDeletion';
import EmailVerificationTemplate from '@/emails/EmailVerification';
import ExpiredAppointmentDeletionTemplate, {
	type ExpiredAppointmentDeletionTemplateProps,
} from '@/emails/ExpiredAppointmentDeletionTemplate';
import ExpiredBookingDeletionTemplate, {
	type ExpiredBookingDeletionTemplateProps,
} from '@/emails/ExpiredBookingDeletion';
import NewAppointmentGenerationTemplate, {
	type NewAppointmentGenerationTemplateProps,
} from '@/emails/NewAppointmentGeneration';
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

export const sendAccountDeletionEmail = async ({
	userName,
	userEmail,
	deletedAssociatedBookings,
}: AccountDeletionTemplateProps) => {
	await sendEmail({
		recipients: [userEmail],
		emailSubject: `Syndicate - Account deletion`,
		emailTemplate: AccountDeletionTemplate({
			userName,
			userEmail,
			deletedAssociatedBookings,
		}),
	});
};

export const sendNewAppointmentGenerationReport = async ({
	message,
	intervalStart,
	intervalEnd,
	workDaysInInterval,
	weekendDaysInInterval,
	generatedNewAppointments,
}: NewAppointmentGenerationTemplateProps) => {
	await sendEmail({
		recipients: [env.REPORT_RECIPIENT],
		emailSubject: `Syndicate - New appointment generation report ${formatDate(new Date(), 'YYYY-MM-DD')}`,
		emailTemplate: NewAppointmentGenerationTemplate({
			message,
			intervalStart,
			intervalEnd,
			workDaysInInterval,
			weekendDaysInInterval,
			generatedNewAppointments,
		}),
	});
};

export const sendExpiredAppointmentDeletionReport = async ({
	message,
	deletedExpiredAppointments,
}: ExpiredAppointmentDeletionTemplateProps) => {
	await sendEmail({
		recipients: [env.REPORT_RECIPIENT],
		emailSubject: `Syndicate - Expired appointment deletion report ${formatDate(new Date(), 'YYYY-MM-DD')}`,
		emailTemplate: ExpiredAppointmentDeletionTemplate({
			message,
			deletedExpiredAppointments,
		}),
	});
};

export const sendExpiredBookingDeletionReport = async ({
	message,
	deletedExpiredBookings,
}: ExpiredBookingDeletionTemplateProps) => {
	await sendEmail({
		recipients: [env.REPORT_RECIPIENT],
		emailSubject: `Syndicate - Expired booking deletion report ${formatDate(new Date(), 'YYYY-MM-DD')}`,
		emailTemplate: ExpiredBookingDeletionTemplate({
			message,
			deletedExpiredBookings,
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
		emailSubject: `Syndicate - Booking confirmation - ${formatDate(appointmentStartTime, 'SHORT_DATE_TIME')}`,
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

export const sendBookingDeletionEmail = async ({
	userName,
	userEmail,
	appointmentStartTime,
	bookingDescription,
	issueName,
	issueDescription,
	reason,
}: BookingDeletionTemplateProps) => {
	await sendEmail({
		recipients: [userEmail],
		emailSubject: `Syndicate - Booking deletion - ${formatDate(appointmentStartTime, 'SHORT_DATE_TIME')}`,
		emailTemplate: BookingDeletionTemplate({
			userName,
			userEmail,
			appointmentStartTime,
			bookingDescription,
			issueName,
			issueDescription,
			reason,
		}),
	});
};

export const sendBookingCancellationEmail = async ({
	userName,
	userEmail,
	appointmentStartTime,
	bookingDescription,
	issueName,
	issueDescription,
}: BookingCancellationTemplateProps) => {
	await sendEmail({
		recipients: [userEmail],
		emailSubject: `Syndicate - Booking cancellation - ${formatDate(appointmentStartTime, 'SHORT_DATE_TIME')}`,
		emailTemplate: BookingCancellationTemplate({
			userName,
			userEmail,
			appointmentStartTime,
			bookingDescription,
			issueName,
			issueDescription,
		}),
	});
};
