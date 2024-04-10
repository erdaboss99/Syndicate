'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { appointmentBookFormSchema } from '@/schemas';
import { Appointment } from '@prisma/client';

import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Textarea } from '@/components/ui/Textarea';

type AppointmentBookFormProps = {
	appointment: Appointment;
};

const AppointmentBookForm = ({ appointment }: AppointmentBookFormProps) => {
	const router = useRouter();

	const form = useForm<z.infer<typeof appointmentBookFormSchema>>({
		resolver: zodResolver(appointmentBookFormSchema),
		defaultValues: {
			description: '',
		},
	});

	function onSubmit(data: z.infer<typeof appointmentBookFormSchema>) {
		console.log(data);
	}

	return (
		<Form {...form}>
			<form
				className='space-y-6'
				onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex flex-col items-center justify-center gap-5'>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										className='resize-none'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					size='lg'
					className='w-full'
					type='submit'>
					Book appointment
				</Button>
			</form>
		</Form>
	);
};

export default AppointmentBookForm;
