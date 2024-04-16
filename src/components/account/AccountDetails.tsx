import { type User } from '@prisma/client';

import { LoginProviders } from '@/auth/next-auth';
import { formatDate } from '@/lib/date';

import { LoginProviderBadge, UserRoleBadge } from '@/components/general/CustomBadge';
import { BaseDetailsField, HighlightedDetailsField } from '@/components/general/DetailsField';
import UserAvatar from '@/components/general/UserAvatar';
import { Badge } from '@/components/ui/Badge';

type AccountDetailsProps = { provider: LoginProviders } & Pick<User, 'image' | 'name' | 'email' | 'role' | 'createdAt'>;

const AccountDetails = ({ image, name, email, role, provider, createdAt }: AccountDetailsProps) => {
	return (
		<>
			<BaseDetailsField label='Avatar'>
				<UserAvatar src={image} />
			</BaseDetailsField>
			<HighlightedDetailsField
				label='Name'
				value={name}
			/>
			<HighlightedDetailsField
				label='Email'
				value={email}
			/>
			<BaseDetailsField label='Role'>
				<UserRoleBadge
					role={role}
					variant='outline'
				/>
			</BaseDetailsField>
			<BaseDetailsField label='Login provider'>
				<LoginProviderBadge
					provider={provider}
					variant='outline'
				/>
			</BaseDetailsField>
			<BaseDetailsField label='Account created at'>
				<Badge variant='outline'>{formatDate(createdAt, 'WRITTEN_SHORT_DATE_TIME')}</Badge>
			</BaseDetailsField>
		</>
	);
};

export default AccountDetails;
