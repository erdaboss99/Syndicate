'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { RequestPasswordResetSchema } from '@/schemas';

import { requestPasswordReset } from '@/actions/request-password-reset';
import CardWrapper from '@/components/general/CardWrapper';
import FormError from '@/components/general/FormError';
import FormSuccess from '@/components/general/FormSuccess';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { LuLoader2 } from 'react-icons/lu';

const RequestPasswordResetForm = () => {
	const [isPending, startTransition] = useTransition();
	const [isError, setIsError] = useState('');
	const [isSuccess, setIsSuccess] = useState('');
	const [isDone, setIsDone] = useState(false);

	const requestPasswordResetForm = useForm<z.infer<typeof RequestPasswordResetSchema>>({
		resolver: zodResolver(RequestPasswordResetSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = (values: z.infer<typeof RequestPasswordResetSchema>) => {
		setIsError('');
		setIsSuccess('');

		startTransition(() => {
			requestPasswordReset(values).then((data) => {
				requestPasswordResetForm.reset();
				if (data?.error) setIsError(data?.error);
				if (data?.success) {
					setIsDone(true);
					setIsSuccess(data?.success);
				}
			});
		});
	};

	return (
		<CardWrapper
			headerTitle='Request new password'
			backButtonLabel='Back to login'
			backButtonHref='/auth/login'
			backButtonVariant='link'
			backButtonSize='full'>
			<Form {...requestPasswordResetForm}>
				<form
					className='space-y-6'
					onSubmit={requestPasswordResetForm.handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						<FormField
							control={requestPasswordResetForm.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email address</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='email@example.com'
											type='email'
											disabled={isPending || isDone}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
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
							'Send password reset email'
						)}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default RequestPasswordResetForm;
