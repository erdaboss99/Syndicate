import * as z from 'zod';

export const LoginSchema = z.object({
	email: z.string().email({ message: 'Invalid email address!' }),
	password: z.string().min(1, 'Password is required!'),
});

export const RegistrationSchema = z
	.object({
		name: z.string().min(1, 'Name is required!'),
		email: z.string().email({ message: 'Email should be a valid email address!' }),
		password: z
			.string()
			.min(6, 'Password should be at least 6 characters!')
			.max(25, 'Password should be maximum of 25 characters!'),
		confirmPassword: z
			.string()
			.min(6, 'Password should be at least 6 characters!')
			.max(25, 'Password should be maximum of 25 characters!'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match!',
		path: ['confirmPassword'],
	});

export const TokenVerificationSchema = z.object({
	token: z.string().uuid(),
});

export const RequestPasswordResetSchema = z.object({
	email: z.string().email({ message: 'Email should be a valid email address!' }),
});

export const ResetPasswordSchema = z
	.object({
		token: z.string().uuid(),
		password: z
			.string()
			.min(6, 'Password should be at least 6 characters!')
			.max(25, 'Password should be maximum of 25 characters!'),
		confirmPassword: z
			.string()
			.min(6, 'Password should be at least 6 characters!')
			.max(25, 'Password should be maximum of 25 characters!'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match!',
		path: ['confirmPassword'],
	});
