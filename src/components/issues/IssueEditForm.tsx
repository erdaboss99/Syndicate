'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { editIssue } from '@/actions/issue';
import { FORM_DEFAULT_ERROR_MESSAGE } from '@/constants';
import { IssueEditFormSchema } from '@/schemas';
import { Issue } from '@prisma/client';

import { Button } from '@/components/ui/Button';
import { DialogFooter } from '@/components/ui/Dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { LuLoader2 } from 'react-icons/lu';

type IssueEditFormProps = {
	issue: Issue;
};

const IssueEditForm = ({ issue }: IssueEditFormProps) => {
	const [isPending, startTransition] = useTransition();
	const [isDone, setIsDone] = useState(false);

	const router = useRouter();

	const issueEditForm = useForm<z.infer<typeof IssueEditFormSchema>>({
		resolver: zodResolver(IssueEditFormSchema),
		defaultValues: {
			id: issue.id,
			name: issue.name,
			description: issue.description,
		},
	});

	const onSubmit = (values: z.infer<typeof IssueEditFormSchema>) => {
		startTransition(() => {
			editIssue(values)
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
		<Form {...issueEditForm}>
			<form
				className='space-y-6'
				onSubmit={issueEditForm.handleSubmit(onSubmit)}>
				<div className='space-y-4'>
					<FormField
						control={issueEditForm.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										{...field}
										type='text'
										disabled={isPending || isDone}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={issueEditForm.control}
						name='description'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Description</FormLabel>
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
						size='lg'
						disabled={isPending || isDone}>
						{isPending ? (
							<span className='flex flex-row items-center gap-2'>
								<LuLoader2 className='animate-spin' />
								Processing...
							</span>
						) : (
							'Update Issue'
						)}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};

export default IssueEditForm;
