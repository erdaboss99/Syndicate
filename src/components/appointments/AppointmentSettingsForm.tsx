'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AppointmentGenerationSchema } from '@/schemas';

import { toggleAutoAppointmentGeneration } from '@/actions/appointment';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/Form';
import { Switch } from '@/components/ui/Switch';
import { toast } from 'sonner';

type AppointmentSettingsFormProps = {
	autoAppointmentGenerationStatus: boolean;
};

const AppointmentSettingsForm = ({ autoAppointmentGenerationStatus }: AppointmentSettingsFormProps) => {
	const [isPending, startTransition] = useTransition();

	const appointmentSettingsForm = useForm<z.infer<typeof AppointmentGenerationSchema>>({
		resolver: zodResolver(AppointmentGenerationSchema),
		defaultValues: {
			autoAppointmentGeneration: autoAppointmentGenerationStatus,
		},
	});

	function onSubmit(values: z.infer<typeof AppointmentGenerationSchema>) {
		startTransition(() => {
			toggleAutoAppointmentGeneration(values).then((data) => {
				if (data?.error) toast.error(data?.error);
				if (data?.success) toast.success(data?.success);
			});
		});
	}

	return (
		<Form {...appointmentSettingsForm}>
			<form
				onSubmit={appointmentSettingsForm.handleSubmit(onSubmit)}
				className='w-full'>
				<div className='space-y-4'>
					<FormField
						control={appointmentSettingsForm.control}
						name='autoAppointmentGeneration'
						render={({ field }) => (
							<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
								<div className='space-y-0.5'>
									<FormLabel>Automatic appointment generation</FormLabel>
									<FormDescription>Automatically generate appointments.</FormDescription>
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

export default AppointmentSettingsForm;
