'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import * as z from 'zod';

import { deleteBooking } from '@/actions/booking';
import { ACTION_DEFAULT_ERROR } from '@/constants';
import { BookingDeleteFormSchema } from '@/schemas';

import { Button } from '@/components/ui/Button';
import { DialogFooter } from '@/components/ui/Dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Textarea } from '../ui/Textarea';

type BookingDeleteFormProps = {
	id: string;
};

const BookingDeleteForm = ({ id }: BookingDeleteFormProps) => {
	const [isPending, startTransition] = useTransition();
	const [isDone, setIsDone] = useState(false);

	const router = useRouter();

	const bookingDeleteForm = useForm<z.infer<typeof BookingDeleteFormSchema>>({
		resolver: zodResolver(BookingDeleteFormSchema),
		defaultValues: {
			id,
			reason: '',
		},
	});

	const onSubmit = (values: z.infer<typeof BookingDeleteFormSchema>) => {
		startTransition(() => {
			deleteBooking(values)
				.then((data) => {
					if (data?.error) toast.error(data?.error);
					if (data?.success) {
						setIsDone(true);
						toast.success(data?.success);
						router.refresh();
					}
				})
				.catch(() => toast.error(ACTION_DEFAULT_ERROR));
		});
	};

	return (
		<Form {...bookingDeleteForm}>
			<form
				className='space-y-6'
				onSubmit={bookingDeleteForm.handleSubmit(onSubmit)}>
				<div className='space-y-4'>
					<FormField
						control={bookingDeleteForm.control}
						name='reason'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Reason</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										className='resize-none'
										disabled={isPending || isDone}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<DialogFooter>
					<Button
						type='submit'
						variant='destructive'
						size='lg'
						disabled={isPending}>
						{isPending ? (
							<span className='flex flex-row items-center gap-2'>
								<LuLoader2 className='animate-spin' />
								Processing...
							</span>
						) : (
							'Delete booking'
						)}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};

export default BookingDeleteForm;
