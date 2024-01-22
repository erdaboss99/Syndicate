'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { registration } from '@/actions/registration';

import { RegistrationSchema } from '@/schemas';

import CardWrapper from '@/components/general/CardWrapper';
import FormError from '@/components/general/FormError';
import FormSuccess from '@/components/general/FormSuccess';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { LuLoader2 } from 'react-icons/lu';

const RegistrationForm = () => {
	const [isPending, startTransition] = useTransition();
	const [isError, setIsError] = useState('');
	const [isSuccess, setIsSuccess] = useState('');

	const registrationForm = useForm<z.infer<typeof RegistrationSchema>>({
		resolver: zodResolver(RegistrationSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof RegistrationSchema>) => {
		setIsError('');
		setIsSuccess('');

		startTransition(() => {
			registration(values)
				.then((data) => {
					if (data.error) {
						registrationForm.reset();
						setIsError(data.error);
					}

					if (data.success) setIsSuccess(data.success);
				})
				.catch(() => setIsError('Something went wrong'));
		});
	};

	return (
		<CardWrapper
			headerTitle='Registration'
			headerLabel='Create an account'
			backButtonLabel='Already have an account?'
			backButtonHref='/auth/login'
			backButtonVariant='link'
			backButtonSize='full'
			showSocial>
			<Form {...registrationForm}>
				<form
					className='space-y-6'
					onSubmit={registrationForm.handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						<FormField
							control={registrationForm.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Your name'
											type='text'
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={registrationForm.control}
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
							control={registrationForm.control}
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
						disabled={isPending}>
						{isPending ? (
							<span className='flex flex-row items-center gap-2'>
								<LuLoader2 className='animate-spin ' />
								Processing...
							</span>
						) : (
							'Create an account'
						)}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default RegistrationForm;
