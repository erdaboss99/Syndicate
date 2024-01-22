'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { NewPasswordSchema } from '@/schemas';

import { newPassword } from '@/actions/new-password';

import CardWrapper from '@/components/general/CardWrapper';
import FormError from '@/components/general/FormError';
import FormSuccess from '@/components/general/FormSuccess';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { LuLoader2 } from 'react-icons/lu';

type NewPasswordFormProps = {
	token: string;
};

const NewPasswordForm = ({ token }: NewPasswordFormProps) => {
	const [isPending, startTransition] = useTransition();
	const [isError, setIsError] = useState('');
	const [isSuccess, setIsSuccess] = useState('');
	const [isDone, setIsDone] = useState(false);

	const newPasswordForm = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			token: token,
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
		setIsError('');
		setIsSuccess('');

		startTransition(() => {
			newPassword(values).then((data) => {
				newPasswordForm.reset();
				setIsDone(true);
				if (data?.error) setIsError(data?.error);
				if (data?.success) setIsSuccess(data?.success);
			});
		});
	};

	return (
		<CardWrapper
			headerTitle='Enter a new password'
			backButtonLabel='Back to login'
			backButtonHref='/auth/login'
			backButtonVariant='link'
			backButtonSize='lg'>
			<Form {...newPasswordForm}>
				<form
					className='space-y-6'
					onSubmit={newPasswordForm.handleSubmit(onSubmit)}>
					<FormField
						control={newPasswordForm.control}
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
						control={newPasswordForm.control}
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
						control={newPasswordForm.control}
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
		</CardWrapper>
	);
};

export default NewPasswordForm;
