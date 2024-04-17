'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Appointment, type Issue } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import * as z from 'zod';

import { createBooking } from '@/actions/booking';
import { ACTION_DEFAULT_ERROR, ACTION_REDIRECT_DELAY } from '@/constants';
import { AppointmentBookSchema } from '@/schemas';

import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

type AppointmentBookFormProps = {
	appointment: Appointment;
	issues: Issue[];
};

const AppointmentBookForm = ({ appointment, issues }: AppointmentBookFormProps) => {
	const [isPending, startTransition] = useTransition();
	const [isDone, setIsDone] = useState(false);

	const router = useRouter();

	const appointmentBookForm = useForm<z.infer<typeof AppointmentBookSchema>>({
		resolver: zodResolver(AppointmentBookSchema),
		defaultValues: {
			appointmentId: appointment.id,
			issueId: '',
			description: '',
		},
	});

	const onSubmit = (values: z.infer<typeof AppointmentBookSchema>) => {
		startTransition(() => {
			createBooking(values)
				.then((data) => {
					if (data?.error) toast.error(data?.error);

					if (data?.success) {
						setIsDone(true);
						toast.success(data?.success);
						setTimeout(() => {
							router.push('/dashboard');
						}, ACTION_REDIRECT_DELAY);
					}
				})
				.catch(() => toast.error(ACTION_DEFAULT_ERROR));
		});
	};

	return (
		<Form {...appointmentBookForm}>
			<form
				className='space-y-6'
				onSubmit={appointmentBookForm.handleSubmit(onSubmit)}>
				<div className='flex flex-col items-center justify-center gap-5'>
					<FormField
						control={appointmentBookForm.control}
						name='issueId'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Issue</FormLabel>
								<Select
									onValueChange={field.onChange}
									disabled={isPending || isDone}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger data-testid='appointment-book-issue-select-trigger'>
											<SelectValue placeholder='Select the issue of the booking' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{issues.map((issue) => (
											<SelectItem
												data-testid='appointment-book-issue-select-item'
												key={issue.id}
												value={issue.id}>
												{issue.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormDescription>
									{issues.find((issue) => issue.id === field.value)?.description}
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={appointmentBookForm.control}
						name='description'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										data-testid='appointment-book-issue-description-input'
										className='resize-none'
										disabled={isPending || isDone}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					data-testid='appointment-book-submit-button'
					type='submit'
					size='lg'
					className='w-full'
					disabled={isPending || isDone}>
					{isPending ? (
						<span className='flex flex-row items-center gap-2'>
							<LuLoader2 className='animate-spin ' />
							Processing...
						</span>
					) : (
						'Book appointment'
					)}
				</Button>
			</form>
		</Form>
	);
};

export default AppointmentBookForm;
