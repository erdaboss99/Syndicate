'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { BookingDeletionSchema } from '@/schemas';
import { toast } from 'sonner';

import { toggleAutoBookingDeletion } from '@/actions/booking';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/Form';
import { Switch } from '@/components/ui/Switch';

type BookingAutoDeletionFormProps = {
	autoBookingDeletionStatus: boolean;
};

const BookingAutoDeletionForm = ({ autoBookingDeletionStatus }: BookingAutoDeletionFormProps) => {
	const [isPending, startTransition] = useTransition();

	const appointmentAutoDeletionForm = useForm<z.infer<typeof BookingDeletionSchema>>({
		resolver: zodResolver(BookingDeletionSchema),
		defaultValues: {
			autoBookingDeletion: autoBookingDeletionStatus,
		},
	});

	function onSubmit(values: z.infer<typeof BookingDeletionSchema>) {
		startTransition(() => {
			toggleAutoBookingDeletion(values).then((data) => {
				if (data?.error) toast.error(data?.error);
				if (data?.success) toast.success(data?.success);
			});
		});
	}

	return (
		<Form {...appointmentAutoDeletionForm}>
			<form
				onSubmit={appointmentAutoDeletionForm.handleSubmit(onSubmit)}
				className='w-full'>
				<div className='space-y-4'>
					<FormField
						control={appointmentAutoDeletionForm.control}
						name='autoBookingDeletion'
						render={({ field }) => (
							<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
								<div className='space-y-0.5'>
									<FormLabel>Automatic booking deletion</FormLabel>
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

export default BookingAutoDeletionForm;
