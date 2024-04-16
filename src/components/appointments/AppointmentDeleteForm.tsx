'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import * as z from 'zod';

import { deleteAppointment } from '@/actions/appointment';
import { ACTION_DEFAULT_ERROR } from '@/constants';
import { AppointmentDeleteSchema } from '@/schemas';

import { Button } from '@/components/ui/Button';
import { DialogFooter } from '@/components/ui/Dialog';
import { Form } from '@/components/ui/Form';

type AppointmentDeleteFormProps = {
	id: string;
};

const AppointmentDeleteForm = ({ id }: AppointmentDeleteFormProps) => {
	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const appointmentDeleteForm = useForm<z.infer<typeof AppointmentDeleteSchema>>({
		resolver: zodResolver(AppointmentDeleteSchema),
		defaultValues: {
			id,
		},
	});

	const onSubmit = (values: z.infer<typeof AppointmentDeleteSchema>) => {
		startTransition(() => {
			deleteAppointment(values)
				.then((data) => {
					if (data?.error) toast.error(data?.error);
					if (data?.success) {
						toast.success(data?.success);
						router.refresh();
					}
				})
				.catch(() => toast.error(ACTION_DEFAULT_ERROR));
		});
	};

	return (
		<Form {...appointmentDeleteForm}>
			<form
				className='space-y-6'
				onSubmit={appointmentDeleteForm.handleSubmit(onSubmit)}>
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

export default AppointmentDeleteForm;
