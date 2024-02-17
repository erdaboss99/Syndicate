import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import authConfig from '@/auth/auth.config';
import { LoginProviders } from '@/auth/next-auth';

import { JWT_TOKEN_EXPIRY } from '@/constants';

import { getAccountByUserId } from '@/data/account';
import { getUserById } from '@/data/user';
import { database } from '@/lib/database';
import { type UserRole } from '@prisma/client';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
	},
	events: {
		async linkAccount({ user }) {
			await database.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			});
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider !== 'credentials') return true;

			const existingUser = await getUserById(user.id);
			if (!existingUser?.emailVerified) return false;

			return true;
		},
		async session({ token, session }) {
			if (token.sub && session.user) session.user.id = token.sub;
			if (token.role && session.user) session.user.role = token.role as UserRole;

			if (session.user) {
				session.user.name = token.name as string;
				session.user.email = token.email as string;
				session.user.provider = token.provider as LoginProviders;
				session.user.updatedAt = new Date(token.updatedAt as string);
				session.user.createdAt = new Date(token.createdAt as string);

				await database.user.update({
					where: { id: session.user.id },
					data: { lastSeen: new Date() },
				});
			}

			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;

			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;

			const existingAccount = await getAccountByUserId(existingUser.id);
			switch (existingAccount?.provider) {
				case 'google':
					token.provider = 'Google';
					break;
				case 'github':
					token.provider = 'GitHub';
					break;
				default:
					token.provider = 'Credentials';
					break;
			}
			token.updatedAt = existingUser.updatedAt.toISOString();
			token.createdAt = existingUser.createdAt.toISOString();
			token.name = existingUser.name;
			token.email = existingUser.email;
			token.role = existingUser.role;

			return token;
		},
	},
	adapter: PrismaAdapter(database),
	session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * JWT_TOKEN_EXPIRY },
	...authConfig,
});
