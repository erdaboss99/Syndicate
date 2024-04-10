'use server';

import * as z from 'zod';

import { getCurrentUser } from '@/lib/auth';

import { database } from '@/lib/database';

import { IssueCreateFormSchema, IssueDeleteFormSchema, IssueEditFormSchema } from '@/schemas';

export const createIssue = async (values: z.infer<typeof IssueCreateFormSchema>) => {
	const validatedData = IssueCreateFormSchema.safeParse(values);
	if (!validatedData.success) return { error: 'Invalid data!' };

	const user = await getCurrentUser();
	if (user?.role !== 'ADMIN') return { error: 'Issue creation not allowed!' };

	const { name, description } = validatedData.data;

	await database.issue.create({
		data: {
			name,
			description,
		},
	});
	return { success: 'Issue successfully created!' };
};

export const editIssue = async (values: z.infer<typeof IssueEditFormSchema>) => {
	const validatedData = IssueEditFormSchema.safeParse(values);
	if (!validatedData.success) return { error: 'Invalid data!' };

	const user = await getCurrentUser();
	if (user?.role !== 'ADMIN') return { error: 'Issue creation not allowed!' };

	const { id, name, description } = validatedData.data;

	const existingIssue = await database.issue.findUnique({
		where: {
			id,
		},
	});
	if (!existingIssue) return { error: 'Issue not found!' };

	await database.issue.update({
		where: {
			id,
		},
		data: {
			name,
			description,
		},
	});
	return { success: 'Issue successfully updated!' };
};

export const deleteIssue = async (values: z.infer<typeof IssueDeleteFormSchema>) => {
	const validatedData = IssueDeleteFormSchema.safeParse(values);
	if (!validatedData.success) return { error: 'Invalid data!' };

	const user = await getCurrentUser();
	if (user?.role !== 'ADMIN') return { error: 'Issue creation not allowed!' };

	const { id } = validatedData.data;

	const existingIssue = await database.issue.findUnique({
		where: {
			id,
		},
	});

	if (!existingIssue) return { error: 'Issue not found!' };
	// TODO LINKED BOOKING CHECK

	await database.issue.delete({
		where: {
			id,
		},
	});
	return { success: 'Issue successfully deleted!' };
};
