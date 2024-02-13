import * as z from 'zod';

const NAME_VALIDATION = 'Name is required!';
const EMAIL_VALIDATION = 'Email should be a valid email address!';
const PASSWORD_VALIDATION = 'Password is required!';
const PASSWORD_MIN_VALIDATION = 'Password should be at least 6 characters!';
const PASSWORD_MAX_VALIDATION = 'Password should be maximum of 25 characters!';
const PASSWORD_MATCH_VALIDATION = 'Passwords do not match!';
const PASSWORD_SAME_VALIDATION = 'New password cannot be the same as the old password!';

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
