'use server';

import * as z from 'zod';

import {
	ACTION_INVALID_PAYLOAD_ERROR,
	ACTION_ISSUE_CREATED_SUCCESS,
	ACTION_ISSUE_DELETED_SUCCESS,
	ACTION_ISSUE_NOT_FOUND_ERROR,
	ACTION_ISSUE_UPDATED_SUCCESS,
	ACTION_ONLY_ADMIN_ERROR,
} from '@/constants';
import { getCurrentUser } from '@/lib/auth';
import { database } from '@/lib/database';
import { IssueCreateFormSchema, IssueDeleteFormSchema, IssueEditFormSchema } from '@/schemas';

export const createIssue = async (values: z.infer<typeof IssueCreateFormSchema>) => {
	const validatedData = IssueCreateFormSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const user = await getCurrentUser();
	if (user?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const { name, description } = validatedData.data;

	await database.issue.create({
		data: {
			name,
			description,
		},
	});
	return { success: ACTION_ISSUE_CREATED_SUCCESS };
};

export const editIssue = async (values: z.infer<typeof IssueEditFormSchema>) => {
	const validatedData = IssueEditFormSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const user = await getCurrentUser();
	if (user?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const { id, name, description } = validatedData.data;

	const existingIssue = await database.issue.findUnique({
		where: {
			id,
		},
	});
	if (!existingIssue) return { error: ACTION_ISSUE_NOT_FOUND_ERROR };

	await database.issue.update({
		where: {
			id,
		},
		data: {
			name,
			description,
		},
	});
	return { success: ACTION_ISSUE_UPDATED_SUCCESS };
};

export const deleteIssue = async (values: z.infer<typeof IssueDeleteFormSchema>) => {
	const validatedData = IssueDeleteFormSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const user = await getCurrentUser();
	if (user?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const { id } = validatedData.data;

	const existingIssue = await database.issue.findUnique({
		where: {
			id,
		},
	});

	if (!existingIssue) return { error: ACTION_ISSUE_NOT_FOUND_ERROR };
	// TODO LINKED BOOKING CHECK

	await database.issue.delete({
		where: {
			id,
		},
	});
	return { success: ACTION_ISSUE_DELETED_SUCCESS };
};
