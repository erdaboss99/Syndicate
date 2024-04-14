'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { toggleAutoBookingDeletion } from '@/actions/booking';
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

	function onSubmit(values: z.infer<typeof AutoExpiredBookingDeletionSchema>) {
		startTransition(() => {
			toggleAutoBookingDeletion(values).then((data) => {
				if (data?.error) toast.error(data?.error);
				if (data?.success) toast.success(data?.success);
			});
		});
	}

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
