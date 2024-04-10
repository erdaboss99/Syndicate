import { type DefaultSession } from 'next-auth';

import { UserRole } from '@prisma/client';

export type LoginProviders = 'Credentials' | 'Google' | 'Github';

export type ExtendedUser = DefaultSession['user'] & {
	name: string;
	email: string;
	role: UserRole;
	provider: LoginProviders;
	updatedAt: Date;
	createdAt: Date;
};

declare module 'next-auth' {
	interface Session {
		user: ExtendedUser;
	}
}
