'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toggleAutoAppointmentDeletion } from '@/actions/appointment';
import { AppointmentDeletionSchema } from '@/schemas';
import { toast } from 'sonner';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/Form';
import { Switch } from '@/components/ui/Switch';

type AppointmentAutoDeletionFormProps = {
	autoAppointmentDeletionStatus: boolean;
};

const AppointmentAutoDeletionForm = ({ autoAppointmentDeletionStatus }: AppointmentAutoDeletionFormProps) => {
	const [isPending, startTransition] = useTransition();

	const appointmentAutoDeletionForm = useForm<z.infer<typeof AppointmentDeletionSchema>>({
		resolver: zodResolver(AppointmentDeletionSchema),
		defaultValues: {
			autoAppointmentDeletion: autoAppointmentDeletionStatus,
		},
	});

	function onSubmit(values: z.infer<typeof AppointmentDeletionSchema>) {
		startTransition(() => {
			toggleAutoAppointmentDeletion(values).then((data) => {
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
						name='autoAppointmentDeletion'
						render={({ field }) => (
							<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
								<div className='space-y-0.5'>
									<FormLabel>Automatic appointment deletion</FormLabel>
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

export default AppointmentAutoDeletionForm;
