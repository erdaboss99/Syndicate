import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import authConfig from '@/auth/auth.config';

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
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.isOAuth = token.isOAuth as boolean;
			}

			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;

			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;

			const existingAccount = await getAccountByUserId(existingUser.id);

			token.isOAuth = !!existingAccount;
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
