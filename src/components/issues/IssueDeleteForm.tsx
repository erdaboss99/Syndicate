'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Issue } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import * as z from 'zod';

import { deleteIssue } from '@/actions/issue';
import { ACTION_DEFAULT_ERROR } from '@/constants';
import { IssueDeleteFormSchema } from '@/schemas';

import { Button } from '@/components/ui/Button';
import { DialogFooter } from '@/components/ui/Dialog';
import { Form } from '@/components/ui/Form';

type IssueDeleteFormProps = {
	issue: Issue;
};

const IssueDeleteForm = ({ issue }: IssueDeleteFormProps) => {
	const [isPending, startTransition] = useTransition();
	const [isDone, setIsDone] = useState(false);

	const router = useRouter();

	const issueDeleteForm = useForm<z.infer<typeof IssueDeleteFormSchema>>({
		resolver: zodResolver(IssueDeleteFormSchema),
		defaultValues: {
			id: issue.id,
		},
	});

	const onSubmit = (values: z.infer<typeof IssueDeleteFormSchema>) => {
		startTransition(() => {
			deleteIssue(values)
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
		<Form {...issueDeleteForm}>
			<form
				className='space-y-6'
				onSubmit={issueDeleteForm.handleSubmit(onSubmit)}>
				<DialogFooter>
					<Button
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
							'Delete Issue'
						)}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};

export default IssueDeleteForm;
