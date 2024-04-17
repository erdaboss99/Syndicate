'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import * as z from 'zod';

import { requestPasswordReset } from '@/actions/request-password-reset';
import { ACTION_DEFAULT_ERROR, ACTION_REDIRECT_DELAY } from '@/constants';
import { RequestPasswordResetSchema } from '@/schemas';

import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';

const RequestPasswordResetForm = () => {
	const [isPending, startTransition] = useTransition();
	const [isDone, setIsDone] = useState(false);

	const router = useRouter();

	const requestPasswordResetForm = useForm<z.infer<typeof RequestPasswordResetSchema>>({
		resolver: zodResolver(RequestPasswordResetSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = (values: z.infer<typeof RequestPasswordResetSchema>) => {
		startTransition(() => {
			requestPasswordReset(values)
				.then((data) => {
					requestPasswordResetForm.reset();
					if (data?.error) toast.error(data?.error);
					if (data?.success) {
						setIsDone(true);
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
						'Send password reset email'
					)}
				</Button>
			</form>
		</Form>
	);
};

export default RequestPasswordResetForm;
