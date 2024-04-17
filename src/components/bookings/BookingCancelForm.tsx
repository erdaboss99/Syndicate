'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import * as z from 'zod';

import { cancelBooking } from '@/actions/booking';
import { ACTION_DEFAULT_ERROR } from '@/constants';
import { BookingCancelSchema } from '@/schemas';

import { Button } from '@/components/ui/Button';
import { DialogFooter } from '@/components/ui/Dialog';
import { Form } from '@/components/ui/Form';

type BookingCancelFormProps = {
	id: string;
};

const BookingCancelForm = ({ id }: BookingCancelFormProps) => {
	const [isPending, startTransition] = useTransition();
	const [isDone, setIsDone] = useState(false);

	const router = useRouter();

	const bookingCancelForm = useForm<z.infer<typeof BookingCancelSchema>>({
		resolver: zodResolver(BookingCancelSchema),
		defaultValues: {
			id,
		},
	});

	const onSubmit = (values: z.infer<typeof BookingCancelSchema>) => {
		startTransition(() => {
			cancelBooking(values)
				.then((data) => {
					if (data?.error) toast.error(data?.error);
					if (data?.success) {
						setIsDone(true);
						toast.success(data?.success);
						router.push('/dashboard');
					}
				})
				.catch(() => toast.error(ACTION_DEFAULT_ERROR));
		});
	};

	return (
		<Form {...bookingCancelForm}>
			<form
				className='space-y-6'
				onSubmit={bookingCancelForm.handleSubmit(onSubmit)}>
				<DialogFooter>
					<Button
						data-testid='booking-cancel-submit-button'
						type='submit'
						variant='destructive'
						size='lg'
						disabled={isPending || isDone}>
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

export default BookingCancelForm;
