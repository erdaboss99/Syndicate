'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { loginWithCredentials } from '@/actions/login';

import { LoginSchema } from '@/schemas';

import AuthWrapper from '@/components/auth/AuthWrapper';
import FormError from '@/components/general/FormError';
import FormSuccess from '@/components/general/FormSuccess';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { LuLoader2 } from 'react-icons/lu';

const LoginForm = () => {
	const searchParams = useSearchParams();
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Email already in use with different provider!' : '';

	const [isPending, startTransition] = useTransition();
	const [isError, setIsError] = useState('');
	const [isSuccess, setIsSuccess] = useState('');

	const loginForm = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setIsError('');
		setIsSuccess('');

		startTransition(() => {
			loginWithCredentials(values).then((data) => {
				loginForm.reset();
				if (data?.error) setIsError(data?.error);
				if (data?.success) setIsSuccess(data?.success);
			});
		});
	};

	return (
		<AuthWrapper
			headerTitle='Login'
			headerLabel='Welcome back!'
			backButtonLabel="Don't have an account?"
			backButtonHref='/auth/registration'
			backButtonVariant='link'
			backButtonSize='full'
			showSocialLogins>
			<Form {...loginForm}>
				<form
					className='space-y-6'
					onSubmit={loginForm.handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						<FormField
							control={loginForm.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email address</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='email@example.com'
											type='email'
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={loginForm.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='*******'
											type='password'
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
									<Button
										size='sm'
										variant='link'
										className='px-0'
										asChild>
										<Link href='/auth/request-password-reset'>Forgot password?</Link>
									</Button>
								</FormItem>
							)}
						/>
					</div>
					<FormError message={isError || urlError} />
					<FormSuccess message={isSuccess} />
					<Button
						type='submit'
						size='lg'
						onClick={() => {
							setIsSuccess('');
							setIsError('');
						}}
						className='w-full'
						disabled={isPending}>
						{isPending ? (
							<span className='flex flex-row items-center gap-2'>
								<LuLoader2 className='animate-spin' />
								Processing...
							</span>
						) : (
							'Login'
						)}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	);
};

export default LoginForm;
