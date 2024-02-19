'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { TokenVerificationSchema } from '@/schemas';

import { emailVerification } from '@/actions/email-verification';

import { ACTION_REDIRECT_DELAY } from '@/constants';

import FormError from '@/components/general/FormError';
import FormSuccess from '@/components/general/FormSuccess';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';

type EmailVerificationFormProps = {
	token: string;
};

const EmailVerificationForm = ({ token }: EmailVerificationFormProps) => {
	const [isPending, startTransition] = useTransition();
	const [isError, setIsError] = useState('');
	const [isSuccess, setIsSuccess] = useState('');
	const [isDone, setIsDone] = useState(false);

	const router = useRouter();

	const emailVerificationForm = useForm<z.infer<typeof TokenVerificationSchema>>({
		resolver: zodResolver(TokenVerificationSchema),
		defaultValues: {
			token: token,
		},
	});

	const onSubmit = (values: z.infer<typeof TokenVerificationSchema>) => {
		setIsError('');
		setIsSuccess('');

		startTransition(() => {
			emailVerification(values).then((data) => {
				emailVerificationForm.reset();
				setIsDone(true);
				if (data?.error) setIsError(data?.error);
				if (data?.success) {
					setIsSuccess(data?.success);
					toast.info('Redirecting to login page...');
					setTimeout(() => {
						router.push('/auth/login');
					}, ACTION_REDIRECT_DELAY);
				}
			});
		});
	};

	return (
		<Form {...emailVerificationForm}>
			<form
				className='space-y-6'
				onSubmit={emailVerificationForm.handleSubmit(onSubmit)}>
				<FormField
					control={emailVerificationForm.control}
					name='token'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									type='hidden'
									disabled={isPending}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
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
						'Verify email address'
					)}
				</Button>
			</form>
		</Form>
	);
};

export default EmailVerificationForm;
