'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { signOut } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import * as z from 'zod';

import { deleteAccount } from '@/actions/account';
import { ACTION_DEFAULT_ERROR, ACTION_REDIRECT_DELAY } from '@/constants';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { AccountDeleteSchema } from '@/schemas';

import LogoutButton from '@/components/auth/LogoutButton';
import { Button } from '@/components/ui/Button';
import { DialogFooter } from '@/components/ui/Dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';

const AccountDeleteForm = () => {
	const user = useCurrentUser();

	const [isPending, startTransition] = useTransition();
	const [isDone, setIsDone] = useState(false);

	const accountDeleteForm = useForm<z.infer<typeof AccountDeleteSchema>>({
		resolver: zodResolver(AccountDeleteSchema),
		defaultValues: {
			id: user?.id,
			email: '',
		},
	});

	const onSubmit = (values: z.infer<typeof AccountDeleteSchema>) => {
		startTransition(() => {
			deleteAccount(values)
				.then((data) => {
					if (data?.error) {
						accountDeleteForm.reset();
						toast.error(data?.error);
					}
					if (data?.success) {
						toast.success(data?.success);
						setIsDone(true);
						setTimeout(() => {
							signOut();
						}, ACTION_REDIRECT_DELAY);
					}
				})
				.catch(() => toast.error(ACTION_DEFAULT_ERROR));
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
				<DialogFooter>
					{!isDone ? (
						<Button
							type='submit'
							variant='destructive'
							size='lg'
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
