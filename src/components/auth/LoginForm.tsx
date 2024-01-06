'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { LoginSchema } from '@/schemas';

import CardWrapper from '@/components/general/CardWrapper';
import FormError from '@/components/general/FormError';
import FormSuccess from '@/components/general/FormSuccess';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';

const LoginForm = () => {
	const loginForm = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		console.log(values);
	};

	return (
		<CardWrapper
			headerTitle='Login'
			headerLabel='Welcome back!'
			backButtonLabel="Don't have an account?"
			backButtonHref='/auth/register'
			showSocial>
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
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message='asd' />
					<FormSuccess message='asd' />
					<Button
						type='submit'
						className='w-full'>
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default LoginForm;
