'use server';

import * as z from 'zod';

import {
	ACTION_INVALID_PAYLOAD_ERROR,
	ACTION_ISSUE_CREATED_SUCCESS,
	ACTION_ISSUE_DELETED_SUCCESS,
	ACTION_ISSUE_DELETE_LINKED_BOOKING_ERROR,
	ACTION_ISSUE_NOT_FOUND_ERROR,
	ACTION_ISSUE_UPDATED_SUCCESS,
	ACTION_ONLY_ADMIN_ERROR,
} from '@/constants';
import { createUniqueIssue, deleteUniqueIssue, getUniqueIssue, updateUniqueIssue } from '@/data/issue';
import { getCurrentUser } from '@/lib/auth';
import { IssueCreateSchema, IssueDeleteSchema, IssueEditSchema } from '@/schemas';

export const createIssue = async (values: z.infer<typeof IssueCreateSchema>) => {
	const validatedData = IssueCreateSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const user = await getCurrentUser();
	if (user?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const { name, description } = validatedData.data;

	await createUniqueIssue({
		data: { name, description },
		select: { id: true },
	});
	return { success: ACTION_ISSUE_CREATED_SUCCESS };
};

export const editIssue = async (values: z.infer<typeof IssueEditSchema>) => {
	const validatedData = IssueEditSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const user = await getCurrentUser();
	if (user?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const { id, name, description } = validatedData.data;

	const existingIssue = await getUniqueIssue({
		where: { id },
		select: { id: true },
	});

	if (!existingIssue) return { error: ACTION_ISSUE_NOT_FOUND_ERROR };
	await updateUniqueIssue({
		where: { id },
		data: { name, description },
		select: { id: true },
	});
	return { success: ACTION_ISSUE_UPDATED_SUCCESS };
};

export const deleteIssue = async (values: z.infer<typeof IssueDeleteSchema>) => {
	const validatedData = IssueDeleteSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const user = await getCurrentUser();
	if (user?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const { id } = validatedData.data;

	const existingIssue = await getUniqueIssue({
		where: { id },
		select: { bookings: true },
	});

	if (!existingIssue) return { error: ACTION_ISSUE_NOT_FOUND_ERROR };

	if (existingIssue.bookings.length !== 0) return { error: ACTION_ISSUE_DELETE_LINKED_BOOKING_ERROR };

	await deleteUniqueIssue({
		where: { id },
		select: { id: true },
	});

	return { success: ACTION_ISSUE_DELETED_SUCCESS };
};
