'use server';

import * as z from 'zod';

import { RegistrationSchema } from '@/schemas';

export const registration = async (
	values: z.infer<typeof RegistrationSchema>,
): Promise<{ success: boolean; message: string }> => {
	const validatedData = RegistrationSchema.safeParse(values);

	if (!validatedData.success) return { success: false, message: 'Invalid data!' };
	else return { success: true, message: 'Account successfully created!' };
};
