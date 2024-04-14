'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import * as z from 'zod';

import { loginWithCredentials } from '@/actions/login';
import { ACTION_DEFAULT_ERROR } from '@/constants';
import { LoginSchema } from '@/schemas';

import FormError from '@/components/general/FormError';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';

const LoginForm = () => {
	const searchParams = useSearchParams();
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Email already in use with different provider!' : '';

	const [isPending, startTransition] = useTransition();

	const loginForm = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		startTransition(() => {
			loginWithCredentials(values)
				.then((data) => {
					loginForm.reset();
					if (data?.error) toast.error(data?.error);
					if (data?.success) toast.success(data?.success);
				})
				.catch(() => toast.error(ACTION_DEFAULT_ERROR));
		});
	};

	return (
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
				<FormError message={urlError} />
				<Button
					type='submit'
					size='lg'
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
	);
};

export default LoginForm;
