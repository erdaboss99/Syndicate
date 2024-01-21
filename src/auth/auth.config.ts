import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import bcrypt from 'bcryptjs';

import { env } from '@/env.mjs';

import { getUserByEmail } from '@/data/user';

import { LoginSchema } from '@/schemas';

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const validatedData = LoginSchema.safeParse(credentials);
				if (validatedData.success) {
					const { email, password } = validatedData.data;
					const existingUser = await getUserByEmail(email);

					if (!existingUser || !existingUser.password) return null;

					const passwordMatch = await bcrypt.compare(password, existingUser.password);
					if (passwordMatch) return existingUser;
				}
				return null;
			},
		}),
		Github({
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
		}),
		Google({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
	],
} satisfies NextAuthConfig;
