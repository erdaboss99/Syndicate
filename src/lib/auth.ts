import { auth } from '@/auth';
import { LoginProviders } from '@/auth/next-auth';

export const getCurrentUser = async () => {
	const session = await auth();
	return session?.user;
};

export const getLoginProvider = (provider: string | undefined): LoginProviders => {
	switch (provider) {
		case 'google':
			return 'Google';
		case 'github':
			return 'Github';
		default:
			return 'Credentials';
	}
};
