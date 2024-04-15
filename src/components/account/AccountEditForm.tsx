'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { signOut } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import * as z from 'zod';

import { editAccount } from '@/actions/account';
import { ACTION_DEFAULT_ERROR, ACTION_REDIRECT_DELAY } from '@/constants';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { AccountEditSchema } from '@/schemas';

import LogoutButton from '@/components/auth/LogoutButton';
import { Button } from '@/components/ui/Button';
import { DialogFooter } from '@/components/ui/Dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';

const AccountEditForm = () => {
	const user = useCurrentUser();

	const [isPending, startTransition] = useTransition();
	const [isDone, setIsDone] = useState(false);

	const accountEditForm = useForm<z.infer<typeof AccountEditSchema>>({
		resolver: zodResolver(AccountEditSchema),
		defaultValues: {
			id: user?.id,
			name: user?.name,
			email: user?.email,
			newPassword: '',
			confirmPassword: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof AccountEditSchema>) => {
		startTransition(() => {
			editAccount(values)
				.then((data) => {
					if (data?.error) {
						accountEditForm.reset();
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
		<Form {...accountEditForm}>
			<form
				className='space-y-6'
				onSubmit={accountEditForm.handleSubmit(onSubmit)}>
				<div className='space-y-4'>
					<FormField
						control={accountEditForm.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										{...field}
										type='text'
										disabled={isPending || isDone}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={accountEditForm.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email address</FormLabel>
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
					<FormField
						control={accountEditForm.control}
						name='newPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>New password</FormLabel>
								<FormControl>
									<Input
										{...field}
										type='password'
										disabled={isPending || isDone}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={accountEditForm.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm new password</FormLabel>
								<FormControl>
									<Input
										{...field}
										type='password'
										disabled={isPending || isDone}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={accountEditForm.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Current password</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder='*******'
										type='password'
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
							size='lg'
							disabled={isPending}>
							{isPending ? (
								<span className='flex flex-row items-center gap-2'>
									<LuLoader2 className='animate-spin' />
									Processing...
								</span>
							) : (
								'Save changes'
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

export default AccountEditForm;
