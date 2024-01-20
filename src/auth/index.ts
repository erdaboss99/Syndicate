import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import authConfig from '@/auth/auth.config';
import { getUserById } from '@/data/user';
import { database } from '@/lib/prisma';
import { UserRole } from '@prisma/client';

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
		async session({ token, session }) {
			if (token.sub && session.user) session.user.id = token.sub;
			if (token.role && session.user) session.user.role = token.role as UserRole;

			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;

			const user = await getUserById(token.sub);

			if (!user) return token;

			return { ...token, role: user.role };
		},
	},
	adapter: PrismaAdapter(database),
	session: { strategy: 'jwt' },
	...authConfig,
});
