'use client';

import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { toggleSendAutoActionReportEmail } from '@/actions/configuration';
import { SendAutoActionReportEmailSchema } from '@/schemas';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/Form';
import { Switch } from '@/components/ui/Switch';

type SendAutoActionReportEmailFormProps = {
	sendAutoActionReportEmailStatus: boolean;
};

const SendAutoActionReportEmailForm = ({ sendAutoActionReportEmailStatus }: SendAutoActionReportEmailFormProps) => {
	const [isPending, startTransition] = useTransition();

	const sendAutoActionReportEmailForm = useForm<z.infer<typeof SendAutoActionReportEmailSchema>>({
		resolver: zodResolver(SendAutoActionReportEmailSchema),
		defaultValues: {
			sendAutoActionReportEmailStatus,
		},
	});

	const onSubmit = (values: z.infer<typeof SendAutoActionReportEmailSchema>) => {
		startTransition(() => {
			toggleSendAutoActionReportEmail(values).then((data) => {
				if (data?.error) toast.error(data?.error);
				if (data?.success) toast.success(data?.success);
			});
		});
	};

	return (
		<Form {...sendAutoActionReportEmailForm}>
			<form
				onSubmit={sendAutoActionReportEmailForm.handleSubmit(onSubmit)}
				className='w-full'>
				<div className='space-y-4'>
					<FormField
						control={sendAutoActionReportEmailForm.control}
						name='sendAutoActionReportEmailStatus'
						render={({ field }) => (
							<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
								<div className='space-y-0.5'>
									<FormLabel>Report email on automatic actions</FormLabel>
									<FormDescription>Send report email on automatic actions.</FormDescription>
								</div>
								<FormControl>
									<Switch
										type='submit'
										checked={field.value}
										onCheckedChange={field.onChange}
										disabled={isPending}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
			</form>
		</Form>
	);
};

export default SendAutoActionReportEmailForm;
