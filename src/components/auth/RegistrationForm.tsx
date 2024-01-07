'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { RegistrationSchema } from '@/schemas';

import { registration } from '@/actions/registration';

import CardWrapper from '@/components/general/CardWrapper';
import FormError from '@/components/general/FormError';
import FormSuccess from '@/components/general/FormSuccess';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';

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
		startTransition(() => {
			registration(values).then((data) => {
				registrationForm.reset();
				if (!data.success) setIsError(data.message);
				else setIsSuccess(data.message);
			});
		});
	};

	return (
		<CardWrapper
			headerTitle='Registration'
			headerLabel='Create an account'
			backButtonLabel='Already have an account?'
			backButtonHref='/auth/login'
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
							<span className='flex flex-row gap-2'>
								<Loader2 className='animate-spin ' />
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
