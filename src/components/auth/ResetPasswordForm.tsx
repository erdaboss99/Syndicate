'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { resetPassword } from '@/actions/reset-password';
import { ACTION_DEFAULT_ERROR, ACTION_REDIRECT_DELAY } from '@/constants';
import { ResetPasswordSchema } from '@/schemas';

import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { LuLoader2 } from 'react-icons/lu';

type ResetPasswordFormProps = {
	token: string;
};

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
	const [isPending, startTransition] = useTransition();
	const [isDone, setIsDone] = useState(false);

	const router = useRouter();

	const resetPasswordForm = useForm<z.infer<typeof ResetPasswordSchema>>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			token: token,
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
		startTransition(() => {
			resetPassword(values)
				.then((data) => {
					resetPasswordForm.reset();
					setIsDone(true);
					if (data?.error) toast.error(data?.error);
					if (data?.success) {
						toast.success(data?.success);
						setTimeout(() => {
							router.push('/auth/login');
						}, ACTION_REDIRECT_DELAY);
					}
				})
				.catch(() => toast.error(ACTION_DEFAULT_ERROR));
		});
	};

	return (
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
				<Button
					type='submit'
					size='lg'
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
	);
};

export default ResetPasswordForm;
