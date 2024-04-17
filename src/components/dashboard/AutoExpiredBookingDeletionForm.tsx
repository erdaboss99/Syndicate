'use client';

import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { toggleAutoExpiredBookingDeletion } from '@/actions/configuration';
import { AutoExpiredBookingDeletionSchema } from '@/schemas';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/Form';
import { Switch } from '@/components/ui/Switch';

type AutoExpiredBookingDeletionFormProps = {
	autoExpiredBookingDeletionStatus: boolean;
};

const AutoExpiredBookingDeletionForm = ({ autoExpiredBookingDeletionStatus }: AutoExpiredBookingDeletionFormProps) => {
	const [isPending, startTransition] = useTransition();

	const autoExpiredBookingDeletionForm = useForm<z.infer<typeof AutoExpiredBookingDeletionSchema>>({
		resolver: zodResolver(AutoExpiredBookingDeletionSchema),
		defaultValues: {
			autoExpiredBookingDeletionStatus,
		},
	});

	const onSubmit = (values: z.infer<typeof AutoExpiredBookingDeletionSchema>) => {
		startTransition(() => {
			toggleAutoExpiredBookingDeletion(values).then((data) => {
				if (data?.error) toast.error(data?.error);
				if (data?.success) toast.success(data?.success);
			});
		});
	};

	return (
		<Form {...autoExpiredBookingDeletionForm}>
			<form
				onSubmit={autoExpiredBookingDeletionForm.handleSubmit(onSubmit)}
				className='w-full'>
				<div className='space-y-4'>
					<FormField
						control={autoExpiredBookingDeletionForm.control}
						name='autoExpiredBookingDeletionStatus'
						render={({ field }) => (
							<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
								<div className='space-y-0.5'>
									<FormLabel>Automatic expired booking deletion</FormLabel>
									<FormDescription>Automatically delete expired bookings.</FormDescription>
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

export default AutoExpiredBookingDeletionForm;
