'use client';

import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { toggleAutoExpiredAppointmentDeletion } from '@/actions/configuration';
import { AutoExpiredAppointmentDeletionSchema } from '@/schemas';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/Form';
import { Switch } from '@/components/ui/Switch';

type AutoExpiredAppointmentDeletionProps = {
	autoExpiredAppointmentDeletionStatus: boolean;
};

const AutoExpiredAppointmentDeletionForm = ({
	autoExpiredAppointmentDeletionStatus,
}: AutoExpiredAppointmentDeletionProps) => {
	const [isPending, startTransition] = useTransition();

	const autoExpiredAppointmentDeletionForm = useForm<z.infer<typeof AutoExpiredAppointmentDeletionSchema>>({
		resolver: zodResolver(AutoExpiredAppointmentDeletionSchema),
		defaultValues: {
			autoExpiredAppointmentDeletionStatus: autoExpiredAppointmentDeletionStatus,
		},
	});

	const onSubmit = (values: z.infer<typeof AutoExpiredAppointmentDeletionSchema>) => {
		startTransition(() => {
			toggleAutoExpiredAppointmentDeletion(values).then((data) => {
				if (data?.error) toast.error(data?.error);
				if (data?.success) toast.success(data?.success);
			});
		});
	};

	return (
		<Form {...autoExpiredAppointmentDeletionForm}>
			<form
				onSubmit={autoExpiredAppointmentDeletionForm.handleSubmit(onSubmit)}
				className='w-full'>
				<div className='space-y-4'>
					<FormField
						control={autoExpiredAppointmentDeletionForm.control}
						name='autoExpiredAppointmentDeletionStatus'
						render={({ field }) => (
							<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
								<div className='space-y-0.5'>
									<FormLabel>Automatic expired appointment deletion</FormLabel>
									<FormDescription>Automatically delete expired appointments.</FormDescription>
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

export default AutoExpiredAppointmentDeletionForm;
