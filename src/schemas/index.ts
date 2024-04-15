import { UserRole } from '@prisma/client';
import * as z from 'zod';

import {
	BOOKING_DELETE_REASON_MAX_VALIDATION,
	BOOKING_DELETE_REASON_MIN_VALIDATION,
	BOOKING_DESCRIPTION_MAX_VALIDATION,
	BOOKING_DESCRIPTION_MIN_VALIDATION,
	DATE_REQUIRED_VALIDATION,
	DATE_YYYY_MM_DD_FORMAT_VALIDATION,
	EMAIL_VALIDATION,
	ISSUE_DESCRIPTION_MAX_VALIDATION,
	ISSUE_DESCRIPTION_MIN_VALIDATION,
	ISSUE_SELECTION_REQUIRED_VALIDATION,
	NAME_VALIDATION,
	PASSWORD_MATCH_VALIDATION,
	PASSWORD_MAX_VALIDATION,
	PASSWORD_MIN_VALIDATION,
	PASSWORD_SAME_VALIDATION,
	PASSWORD_VALIDATION,
	UUID_VALIDATION,
} from '@/constants';

export const LoginSchema = z.object({
	email: z.string().email({ message: EMAIL_VALIDATION }),
	password: z.string().min(1, PASSWORD_VALIDATION),
});

export const RegistrationSchema = z
	.object({
		name: z.string().min(1, NAME_VALIDATION),
		email: z.string().email({ message: EMAIL_VALIDATION }),
		password: z.string().min(6, PASSWORD_MIN_VALIDATION).max(25, PASSWORD_MAX_VALIDATION),
		confirmPassword: z.string().min(6, PASSWORD_MIN_VALIDATION).max(25, PASSWORD_MAX_VALIDATION),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: PASSWORD_MATCH_VALIDATION,
		path: ['confirmPassword'],
	});

export const TokenVerificationSchema = z.object({
	token: z.string().uuid({ message: UUID_VALIDATION }),
});

export const RequestPasswordResetSchema = z.object({
	email: z.string().email({ message: EMAIL_VALIDATION }),
});

export const ResetPasswordSchema = z
	.object({
		token: z.string().uuid({ message: UUID_VALIDATION }),
		password: z.string().min(6, PASSWORD_MIN_VALIDATION).max(25, PASSWORD_MAX_VALIDATION),
		confirmPassword: z.string().min(6, PASSWORD_MIN_VALIDATION).max(25, PASSWORD_MAX_VALIDATION),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: PASSWORD_MATCH_VALIDATION,
		path: ['confirmPassword'],
	});

export const AccountEditSchema = z
	.object({
		id: z.string().uuid({ message: UUID_VALIDATION }),
		name: z.string().min(1, NAME_VALIDATION),
		email: z.string().email({ message: EMAIL_VALIDATION }),
		newPassword: z
			.union([z.string().min(6, PASSWORD_MIN_VALIDATION).max(25, PASSWORD_MAX_VALIDATION), z.string().length(0)])
			.optional()
			.transform((newPassword) => (newPassword === '' ? undefined : newPassword)),
		confirmPassword: z
			.union([z.string().min(6, PASSWORD_MIN_VALIDATION).max(25, PASSWORD_MAX_VALIDATION), z.string().length(0)])
			.optional()
			.transform((confirmNewPassword) => (confirmNewPassword === '' ? undefined : confirmNewPassword)),
		password: z.string().min(6, PASSWORD_MIN_VALIDATION).max(25, PASSWORD_MAX_VALIDATION),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: PASSWORD_MATCH_VALIDATION,
		path: ['confirmPassword'],
	})
	.refine((data) => data.newPassword !== data.password, {
		message: PASSWORD_SAME_VALIDATION,
		path: ['newPassword'],
	});

export const AccountDeleteSchema = z.object({
	id: z.string().uuid({ message: UUID_VALIDATION }),
	email: z.string().email({ message: EMAIL_VALIDATION }),
});

export const RoleChangeSchema = z.object({
	id: z.string().uuid({ message: UUID_VALIDATION }),
	role: z.nativeEnum(UserRole),
});

export const AutoNewAppointmentGenerationSchema = z.object({
	autoNewAppointmentGenerationStatus: z.boolean(),
});

export const AutoExpiredAppointmentDeletionSchema = z.object({
	autoExpiredAppointmentDeletionStatus: z.boolean(),
});

export const AutoExpiredBookingDeletionSchema = z.object({
	autoExpiredBookingDeletionStatus: z.boolean(),
});

export const DateSelectionFormSchema = z.object({
	selectedDate: z.date({
		required_error: DATE_REQUIRED_VALIDATION,
	}),
});

export const AppointmentSelectQueryParamsSchema = z
	.string()
	.regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, DATE_YYYY_MM_DD_FORMAT_VALIDATION);

export const AppointmentBookQueryParamsSchema = z.string().uuid({ message: UUID_VALIDATION });

export const AppointmentBookFormSchema = z.object({
	appointmentId: z.string().uuid({ message: UUID_VALIDATION }),
	issueId: z.string().min(1, ISSUE_SELECTION_REQUIRED_VALIDATION).uuid({ message: UUID_VALIDATION }),
	description: z
		.string()
		.min(5, { message: BOOKING_DESCRIPTION_MIN_VALIDATION })
		.max(55, { message: BOOKING_DESCRIPTION_MAX_VALIDATION }),
});

export const AppointmentDeleteFormSchema = z.object({
	id: z.string().uuid({ message: UUID_VALIDATION }),
});

export const IssueCreateFormSchema = z.object({
	name: z.string().min(1, NAME_VALIDATION),
	description: z
		.string()
		.min(5, { message: ISSUE_DESCRIPTION_MIN_VALIDATION })
		.max(55, { message: ISSUE_DESCRIPTION_MAX_VALIDATION }),
});

export const IssueEditFormSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1, NAME_VALIDATION),
	description: z
		.string()
		.min(5, { message: ISSUE_DESCRIPTION_MIN_VALIDATION })
		.max(55, { message: ISSUE_DESCRIPTION_MAX_VALIDATION }),
});

export const IssueDeleteFormSchema = z.object({
	id: z.string().uuid({ message: UUID_VALIDATION }),
});

export const UserDetailsQueryParamsSchema = z.string().uuid({ message: UUID_VALIDATION });

export const BookingDetailsQueryParamsSchema = z.string().uuid({ message: UUID_VALIDATION });

export const BookingDeleteFormSchema = z.object({
	id: z.string().uuid({ message: UUID_VALIDATION }),
	reason: z
		.string()
		.min(5, { message: BOOKING_DELETE_REASON_MIN_VALIDATION })
		.max(55, { message: BOOKING_DELETE_REASON_MAX_VALIDATION }),
});
