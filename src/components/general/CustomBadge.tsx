import { GrGoogle } from 'react-icons/gr';
import { IconType } from 'react-icons/lib';
import { LuBriefcase, LuGithub, LuKeyRound, LuShield, LuUser, LuUserCheck, LuUserX } from 'react-icons/lu';

import { LoginProviders } from '@/auth/next-auth';
import { UserRole } from '@prisma/client';

import { Badge, BadgeProps } from '@/components/ui/Badge';

type BaseBadgeProps = {
	variant: BadgeProps['variant'];
	Icon: IconType;
	label: string;
};

const BaseBadge = ({ Icon, label, variant }: BaseBadgeProps) => {
	return (
		<Badge variant={variant}>
			<Icon
				className='mr-2'
				size={16}
			/>
			{label}
		</Badge>
	);
};

type UserRoleBadgeProps = {
	role: UserRole;
} & Pick<BaseBadgeProps, 'variant'>;

export const UserRoleBadge = ({ role, variant }: UserRoleBadgeProps) => {
	switch (role) {
		case UserRole.ADMIN:
			return (
				<BaseBadge
					variant={variant}
					Icon={LuShield}
					label='Admin'
				/>
			);
		case UserRole.EMPLOYEE:
			return (
				<BaseBadge
					variant={variant}
					Icon={LuBriefcase}
					label='Employee'
				/>
			);
		case UserRole.USER:
			return (
				<BaseBadge
					variant={variant}
					Icon={LuUser}
					label='User'
				/>
			);
	}
};

type AppointmentBadgeProps = {
	status: 'BOOKED' | 'AVAILABLE';
} & Pick<BaseBadgeProps, 'variant'>;

export const AppointmentBadge = ({ status, variant }: AppointmentBadgeProps) => {
	switch (status) {
		case 'BOOKED':
			return (
				<BaseBadge
					variant={variant}
					Icon={LuUserX}
					label='Booked'
				/>
			);
		case 'AVAILABLE':
			return (
				<BaseBadge
					variant={variant}
					Icon={LuUserCheck}
					label='Available'
				/>
			);
	}
};

type LoginProviderBadge = {
	provider: LoginProviders;
} & Pick<BaseBadgeProps, 'variant'>;

export const LoginProviderBadge = ({ provider, variant }: LoginProviderBadge) => {
	switch (provider) {
		case 'Github':
			return (
				<BaseBadge
					variant={variant}
					Icon={LuGithub}
					label='Github'
				/>
			);
		case 'Google':
			return (
				<BaseBadge
					variant={variant}
					Icon={GrGoogle}
					label='Google'
				/>
			);
		default:
			return (
				<BaseBadge
					variant={variant}
					Icon={LuKeyRound}
					label='Credentials'
				/>
			);
	}
};
