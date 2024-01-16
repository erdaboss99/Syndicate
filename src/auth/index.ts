import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import authConfig from '@/auth/auth.config';
import { database } from '@/lib/prisma';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	adapter: PrismaAdapter(database),
	session: { strategy: 'jwt' },
	...authConfig,
});
