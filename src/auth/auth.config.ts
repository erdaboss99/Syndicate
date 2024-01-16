import GitHub from 'next-auth/providers/github';

import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import bcrypt from 'bcryptjs';

import { getUserByEmail } from '@/data/user';
import { LoginSchema } from '@/schemas';

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const validatedData = LoginSchema.safeParse(credentials);
				if (validatedData.success) {
					const { email, password } = validatedData.data;
					const user = await getUserByEmail(email);

					if (!user || !user.password) return null;

					const passwordMatch = await bcrypt.compare(password, user.password);
					if (passwordMatch) return user;
				}
				return null;
			},
		}),
		GitHub,
	],
} satisfies NextAuthConfig;
