'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { emailVerification } from '@/actions/email-verification';
import { ACTION_DEFAULT_ERROR, ACTION_REDIRECT_DELAY } from '@/constants';
import { TokenVerificationSchema } from '@/schemas';
import { toast } from 'sonner';

import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { LuLoader2 } from 'react-icons/lu';

type EmailVerificationFormProps = {
	token: string;
};

const EmailVerificationForm = ({ token }: EmailVerificationFormProps) => {
	const [isPending, startTransition] = useTransition();
	const [isDone, setIsDone] = useState(false);

	const router = useRouter();

	const emailVerificationForm = useForm<z.infer<typeof TokenVerificationSchema>>({
		resolver: zodResolver(TokenVerificationSchema),
		defaultValues: {
			token: token,
		},
	});

	const onSubmit = (values: z.infer<typeof TokenVerificationSchema>) => {
		startTransition(() => {
			emailVerification(values)
				.then((data) => {
					emailVerificationForm.reset();
					setIsDone(true);
					if (data?.error) toast.error(data?.error);
					if (data?.success) {
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
						'Verify email address'
					)}
				</Button>
			</form>
		</Form>
	);
};

export default EmailVerificationForm;
