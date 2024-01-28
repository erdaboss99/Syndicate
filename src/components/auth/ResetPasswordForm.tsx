'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { ResetPasswordSchema } from '@/schemas';

import { resetPassword } from '@/actions/reset-password';

import AuthWrapper from '@/components/auth/AuthWrapper';
import FormError from '@/components/general/FormError';
import FormSuccess from '@/components/general/FormSuccess';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { LuLoader2 } from 'react-icons/lu';

type ResetPasswordFormProps = {
	token: string;
};

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
	const [isPending, startTransition] = useTransition();
	const [isError, setIsError] = useState('');
	const [isSuccess, setIsSuccess] = useState('');
	const [isDone, setIsDone] = useState(false);

	const resetPasswordForm = useForm<z.infer<typeof ResetPasswordSchema>>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			token: token,
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
		setIsError('');
		setIsSuccess('');

		startTransition(() => {
			resetPassword(values).then((data) => {
				resetPasswordForm.reset();
				setIsDone(true);
				if (data?.error) setIsError(data?.error);
				if (data?.success) setIsSuccess(data?.success);
			});
		});
	};

	return (
		<AuthWrapper
			headerTitle='Enter a new password'
			buttonLabel='Back to login'
			buttonHref='/auth/login'
			buttonVariant='link'
			buttonSize='lg'>
			<Form {...resetPasswordForm}>
				<form
					className='space-y-6'
					onSubmit={resetPasswordForm.handleSubmit(onSubmit)}>
					<FormField
						control={resetPasswordForm.control}
						name='token'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										type='hidden'
										disabled={isPending}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={resetPasswordForm.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										{...field}
										type='password'
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={resetPasswordForm.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm password</FormLabel>
								<FormControl>
									<Input
										{...field}
										type='password'
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormError message={isError} />
					<FormSuccess message={isSuccess} />
					<Button
						type='submit'
						size='lg'
						onClick={() => {
							setIsSuccess('');
							setIsError('');
						}}
						className='w-full'
						disabled={isPending || isDone}>
						{isPending ? (
							<span className='flex flex-row items-center gap-2'>
								<LuLoader2 className='animate-spin' />
								Processing...
							</span>
						) : (
							'Reset password'
						)}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	);
};

export default ResetPasswordForm;
