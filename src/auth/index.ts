import NextAuth from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { type UserRole } from '@prisma/client';

import authConfig from '@/auth/auth.config';
import { LoginProviders } from '@/auth/next-auth';
import { JWT_TOKEN_EXPIRY } from '@/constants';
import { getUniqueAccount } from '@/data/account';
import { getUniqueUser, updateUniqueUser } from '@/data/user';
import { getLoginProvider } from '@/lib/auth';
import { database } from '@/lib/database';

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
			await updateUniqueUser({
				where: { id: user.id },
				data: { emailVerified: new Date() },
				select: { id: true },
			});
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider !== 'credentials') return true;

			const existingUser = await getUniqueUser({
				where: { id: user?.id },
				select: { emailVerified: true },
			});
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
				session.user.createdAt = new Date(token.createdAt as string);
			}

			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;

			const existingUser = await getUniqueUser({
				where: { id: token.sub },
				select: { id: true, name: true, email: true, role: true, createdAt: true },
			});
			if (!existingUser) return token;

			const existingAccount = await getUniqueAccount({
				where: { id: existingUser.id },
				select: { provider: true },
			});

			token.provider = getLoginProvider(existingAccount?.provider);
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
