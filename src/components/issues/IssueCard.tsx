import { type Issue } from '@prisma/client';

import IssueCreateForm from '@/components/issues/IssueCreateForm';
import IssueDeleteForm from '@/components/issues/IssueDeleteForm';
import IssueEditForm from '@/components/issues/IssueEditForm';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/Dialog';
import { LuPencil, LuPlusCircle, LuTrash2 } from 'react-icons/lu';

type IssueCardProps = {
	issue: Issue;
};

const ISSUE_CARD_BASE_CLASSES = 'h-full min-h-[150px] w-full';

export const IssueCard = ({ issue }: IssueCardProps) => {
	return (
		<div className={ISSUE_CARD_BASE_CLASSES}>
			<Card variant='tile'>
				<CardHeader className='flex flex-row items-center justify-between pb-1'>
					<CardTitle className='text-lg md:text-xl'>{issue.name}</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-base md:text-lg'>{issue.description}</p>
				</CardContent>
				<CardFooter className='flex items-center justify-end gap-6'>
					<Dialog>
						<DialogTrigger asChild>
							<LuPencil
								className='cursor-pointer'
								size={20}
							/>
						</DialogTrigger>
						<DialogContent className='sm:max-w-[425px]'>
							<DialogHeader>
								<DialogTitle>Update issue</DialogTitle>
							</DialogHeader>
							<IssueEditForm issue={issue} />
						</DialogContent>
					</Dialog>
					<Dialog>
						<DialogTrigger asChild>
							<LuTrash2
								className='cursor-pointer'
								size={20}
							/>
						</DialogTrigger>
						<DialogContent className='sm:max-w-[425px]'>
							<DialogHeader>
								<DialogTitle>Delete issue</DialogTitle>
								<DialogDescription>
									This action is irreversible. Are you sure you want to delete this issue?
								</DialogDescription>
							</DialogHeader>
							<IssueDeleteForm issue={issue} />
						</DialogContent>
					</Dialog>
				</CardFooter>
			</Card>
		</div>
	);
};

export const NewIssueCard = () => {
	return (
		<Dialog>
			<DialogTrigger
				className={ISSUE_CARD_BASE_CLASSES}
				asChild>
				<Card variant='tile'>
					<div className='flex h-full w-full items-center justify-center text-primary'>
						<LuPlusCircle size={45} />
					</div>
				</Card>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Create new issue</DialogTitle>
				</DialogHeader>
				<IssueCreateForm />
			</DialogContent>
		</Dialog>
	);
};
