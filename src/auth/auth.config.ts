import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

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
		Github({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
} satisfies NextAuthConfig;
