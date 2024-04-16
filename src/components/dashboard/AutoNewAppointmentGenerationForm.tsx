'use client';

import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { toggleAutoNewAppointmentGeneration } from '@/actions/configuration';
import { AutoNewAppointmentGenerationSchema } from '@/schemas';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/Form';
import { Switch } from '@/components/ui/Switch';

type AutoNewAppointmentGenerationFormProps = {
	autoNewAppointmentGenerationStatus: boolean;
};

const AutoNewAppointmentGenerationForm = ({
	autoNewAppointmentGenerationStatus,
}: AutoNewAppointmentGenerationFormProps) => {
	const [isPending, startTransition] = useTransition();

	const autoNewAppointmentGenerationForm = useForm<z.infer<typeof AutoNewAppointmentGenerationSchema>>({
		resolver: zodResolver(AutoNewAppointmentGenerationSchema),
		defaultValues: {
			autoNewAppointmentGenerationStatus,
		},
	});

	function onSubmit(values: z.infer<typeof AutoNewAppointmentGenerationSchema>) {
		startTransition(() => {
			toggleAutoNewAppointmentGeneration(values).then((data) => {
				if (data?.error) toast.error(data?.error);
				if (data?.success) toast.success(data?.success);
			});
		});
	}

	return (
		<Form {...autoNewAppointmentGenerationForm}>
			<form
				onSubmit={autoNewAppointmentGenerationForm.handleSubmit(onSubmit)}
				className='w-full'>
				<div className='space-y-4'>
					<FormField
						control={autoNewAppointmentGenerationForm.control}
						name='autoNewAppointmentGenerationStatus'
						render={({ field }) => (
							<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
								<div className='space-y-0.5'>
									<FormLabel>Automatic new appointment generation</FormLabel>
									<FormDescription>Automatically generate new appointments.</FormDescription>
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

export default AutoNewAppointmentGenerationForm;
