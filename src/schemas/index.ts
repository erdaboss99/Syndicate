import * as z from 'zod';

import { UserRole } from '@prisma/client';

const NAME_VALIDATION = 'Name is required!';
const EMAIL_VALIDATION = 'Email should be a valid email address!';
const PASSWORD_VALIDATION = 'Password is required!';
const PASSWORD_MIN_VALIDATION = 'Password should be at least 6 characters!';
const PASSWORD_MAX_VALIDATION = 'Password should be maximum of 25 characters!';
const PASSWORD_MATCH_VALIDATION = 'Passwords do not match!';
const PASSWORD_SAME_VALIDATION = 'New password cannot be the same as the old password!';
const UUID_VALIDATION = 'Invalid UUID!';
const DATE_REQUIRED_VALIDATION = 'Date is required!';
const DATE_YYYY_MM_DD_FORMAT_VALIDATION = 'Date should be in yyyy-MM-dd format!';
const BOOKING_DESCRIPTION_MIN_VALIDATION = 'Booking deecription should be at least 5 characters!';
const BOOKING_DESCRIPTION_MAX_VALIDATION = 'Booking description should be maximum of 55 characters!';
const ISSUE_DESCRIPTION_MIN_VALIDATION = 'Issue deecription should be at least 5 characters!';
const ISSUE_DESCRIPTION_MAX_VALIDATION = 'Issue description should be maximum of 55 characters!';

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
	email: z.string().email({ message: EMAIL_VALIDATION }),
});

export const RoleChangeSchema = z.object({
	id: z.string().uuid({ message: UUID_VALIDATION }),
	role: z.nativeEnum(UserRole),
});

export const AppointmentGenerationSchema = z.object({
	autoAppointmentGeneration: z.boolean(),
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
	description: z
		.string()
		.min(5, { message: BOOKING_DESCRIPTION_MIN_VALIDATION })
		.max(55, { message: BOOKING_DESCRIPTION_MAX_VALIDATION }),
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
