import { UserRole } from '@prisma/client';
import * as z from 'zod';

const NAME_VALIDATION = 'Name is required!';
const EMAIL_VALIDATION = 'Email should be a valid email address!';
const PASSWORD_VALIDATION = 'Password is required!';
const PASSWORD_MIN_VALIDATION = 'Password should be at least 6 characters!';
const PASSWORD_MAX_VALIDATION = 'Password should be maximum of 25 characters!';
const PASSWORD_MATCH_VALIDATION = 'Passwords do not match!';
const PASSWORD_SAME_VALIDATION = 'New password cannot be the same as the old password!';
const VALIDATION_REQUIRED_DATE_ERROR = 'Date is required!';
const VALIDATION_YYYY_MM_DD_DATE_FORMAT_ERROR = 'Date should be in yyyy-MM-dd format!';
const VALIDATION_SHORT_BOOKING_DESCRIPTION_ERROR = 'Booking deecription should be at least 5 characters!';
const VALIDATION_LONG_BOOKING_DESCRIPTION_ERROR = 'Booking description should be maximum of 55 characters!';
const VALIDATION_SHORT_ISSUE_DESCRIPTION_ERROR = 'Issue deecription should be at least 5 characters!';
const VALIDATION_LONG_ISSUE_DESCRIPTION_ERROR = 'Issue description should be maximum of 55 characters!';

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
	token: z.string().uuid(),
});

export const RequestPasswordResetSchema = z.object({
	email: z.string().email({ message: EMAIL_VALIDATION }),
});

export const ResetPasswordSchema = z
	.object({
		token: z.string().uuid(),
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
	id: z.string().uuid(),
	role: z.nativeEnum(UserRole),
});

export const AppointmentGenerationSchema = z.object({
	autoAppointmentGeneration: z.boolean(),
});

export const DateSelectionFormSchema = z.object({
	selectedDate: z.date({
		required_error: VALIDATION_REQUIRED_DATE_ERROR,
	}),
});

export const appointmentSelectQueryParamsSchema = z
	.string()
	.regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, VALIDATION_YYYY_MM_DD_DATE_FORMAT_ERROR);

export const appointmentBookQueryParamsSchema = z.string().uuid();

export const appointmentBookFormSchema = z.object({
	description: z
		.string()
		.min(5, { message: VALIDATION_SHORT_BOOKING_DESCRIPTION_ERROR })
		.max(55, { message: VALIDATION_LONG_BOOKING_DESCRIPTION_ERROR }),
});

export const issueCreateFormSchema = z.object({
	name: z.string().min(1, NAME_VALIDATION),
	description: z
		.string()
		.min(5, { message: VALIDATION_SHORT_ISSUE_DESCRIPTION_ERROR })
		.max(55, { message: VALIDATION_LONG_ISSUE_DESCRIPTION_ERROR }),
});

export const issueEditFormSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1, NAME_VALIDATION),
	description: z
		.string()
		.min(5, { message: VALIDATION_SHORT_ISSUE_DESCRIPTION_ERROR })
		.max(55, { message: VALIDATION_LONG_ISSUE_DESCRIPTION_ERROR }),
});

export const issueDeleteFormSchema = z.object({
	id: z.string().uuid(),
});
