'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signOut } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { deleteAccount } from '@/actions/account';

import { AccountDeleteSchema } from '@/schemas';

import { ACTION_REDIRECT_DELAY } from '@/constants';

import LogoutButton from '@/components/auth/LogoutButton';
import FormError from '@/components/general/FormError';
import FormSuccess from '@/components/general/FormSuccess';
import { Button } from '@/components/ui/Button';
import { DialogFooter } from '@/components/ui/Dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';

const AccountDeleteForm = () => {
	const [isPending, startTransition] = useTransition();
	const [isError, setIsError] = useState('');
	const [isSuccess, setIsSuccess] = useState('');
	const [isDone, setIsDone] = useState(false);

	const accountDeleteForm = useForm<z.infer<typeof AccountDeleteSchema>>({
		resolver: zodResolver(AccountDeleteSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = (values: z.infer<typeof AccountDeleteSchema>) => {
		setIsError('');
		setIsSuccess('');

		startTransition(() => {
			deleteAccount(values)
				.then((data) => {
					if (data?.error) {
						accountDeleteForm.reset();
						setIsError(data?.error);
					}
					if (data?.success) {
						setIsSuccess(data?.success);
						setIsDone(true);
						toast.info('Redirecting to login page...');
						setTimeout(() => {
							signOut();
						}, ACTION_REDIRECT_DELAY);
					}
				})
				.catch(() => setIsError('Something went wrong'));
		});
	};

	return (
		<Form {...accountDeleteForm}>
			<form
				className='space-y-6'
				onSubmit={accountDeleteForm.handleSubmit(onSubmit)}>
				<div className='space-y-4'>
					<FormField
						control={accountDeleteForm.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Please confirm your email address</FormLabel>
								<FormControl>
									<Input
										{...field}
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
				<DialogFooter>
					{!isDone ? (
						<Button
							type='submit'
							variant='destructive'
							size='lg'
							onClick={() => {
								setIsSuccess('');
								setIsError('');
							}}
							disabled={isPending}>
							{isPending ? (
								<span className='flex flex-row items-center gap-2'>
									<LuLoader2 className='animate-spin' />
									Processing...
								</span>
							) : (
								'Delete account'
							)}
						</Button>
					) : (
						<LogoutButton>
							<Button
								size='lg'
								variant='default'>
								Log in
							</Button>
						</LogoutButton>
					)}
				</DialogFooter>
			</form>
		</Form>
	);
};

export default AccountDeleteForm;
