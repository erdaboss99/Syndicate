'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { deleteIssue } from '@/actions/issue';
import { FORM_DEFAULT_ERROR_MESSAGE } from '@/constants';
import { issueDeleteFormSchema } from '@/schemas';
import { Issue } from '@prisma/client';

import { Button } from '@/components/ui/Button';
import { DialogFooter } from '@/components/ui/Dialog';
import { Form } from '@/components/ui/Form';
import { LuLoader2 } from 'react-icons/lu';

type IssueDeleteFormProps = {
	issue: Issue;
};

const IssueDeleteForm = ({ issue }: IssueDeleteFormProps) => {
	const [isPending, startTransition] = useTransition();
	const [isDone, setIsDone] = useState(false);

	const router = useRouter();

	const issueDeleteForm = useForm<z.infer<typeof issueDeleteFormSchema>>({
		resolver: zodResolver(issueDeleteFormSchema),
		defaultValues: {
			id: issue.id,
		},
	});

	const onSubmit = (values: z.infer<typeof issueDeleteFormSchema>) => {
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
				.catch(() => toast.error(FORM_DEFAULT_ERROR_MESSAGE));
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
