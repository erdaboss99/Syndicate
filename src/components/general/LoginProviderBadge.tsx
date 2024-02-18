import { LoginProviders } from '@/auth/next-auth';

import { Badge, type BadgeProps } from '@/components/ui/Badge';
import { GrGoogle } from 'react-icons/gr';
import { LuGithub, LuKeyRound } from 'react-icons/lu';

type LoginProviderBadge = {
	provider: LoginProviders;
	badgeVariant: BadgeProps['variant'];
};

const LoginProviderBadge = ({ provider, badgeVariant }: LoginProviderBadge) => {
	return (
		<Badge variant={badgeVariant}>
			{provider === 'Github' ? <GithubBadge /> : provider === 'Google' ? <GoogleBadge /> : <CredentialsBadge />}
		</Badge>
	);
};

const GithubBadge = () => {
	return (
		<>
			<LuGithub
				className='mr-2'
				size={16}
			/>
			Github
		</>
	);
};

const GoogleBadge = () => {
	return (
		<>
			<GrGoogle
				className='mr-2'
				size={16}
			/>
			Google
		</>
	);
};

const CredentialsBadge = () => {
	return (
		<>
			<LuKeyRound
				className='mr-2'
				size={16}
			/>
			Credentials
		</>
	);
};

export default LoginProviderBadge;
