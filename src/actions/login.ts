'use server';

import * as z from 'zod';

import { LoginSchema } from '@/schemas';

export const loginWithCredentials = async (
	values: z.infer<typeof LoginSchema>,
): Promise<{ success: boolean; message: string }> => {
	const validatedData = LoginSchema.safeParse(values);

	if (!validatedData.success) return { success: false, message: 'Invalid data!' };
	else return { success: true, message: 'Successfully logged in!' };
};
