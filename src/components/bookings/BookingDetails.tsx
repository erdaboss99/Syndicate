import { formatDate } from '@/lib/date';

import { type Appointment, type Booking, type Issue, type User } from '@prisma/client';

import { BaseDetailsField, HighlightedDetailsField } from '@/components/general/DetailsField';
import LinkTile from '@/components/general/LinkTile';
import { Badge } from '@/components/ui/Badge';
import { CardHeader } from '@/components/ui/Card';

type AssociatedUserDetailsProps = {
	User: Pick<User, 'id' | 'name' | 'email'>;
};

export type BookingDetailsProps = {
	userLink?: string;
	Issue: Pick<Issue, 'name' | 'description'>;
	Appointment: Pick<Appointment, 'startTime'>;
} & AssociatedUserDetailsProps &
	Pick<Booking, 'description' | 'createdAt'>;

const AssociatedUserDetails = ({ User }: AssociatedUserDetailsProps) => {
	return (
		<>
			<CardHeader variant='tertiary'>User details</CardHeader>
			<HighlightedDetailsField
				label='User name'
				value={User.name}
			/>
			<HighlightedDetailsField
				label='User email'
				value={User.email}
			/>
		</>
	);
};

export const BookingDetails = ({ description, createdAt, Issue, Appointment, User, userLink }: BookingDetailsProps) => {
	return (
		<>
			<HighlightedDetailsField
				label='Appointment'
				value={formatDate(Appointment.startTime, 'WRITTEN_LONG_DATE_TIME')}
			/>
			<BaseDetailsField label='Description'>{description}</BaseDetailsField>
			<BaseDetailsField label='Created at'>
				<Badge variant='outline'>{formatDate(createdAt, 'WRITTEN_SHORT_DATE_TIME')}</Badge>
			</BaseDetailsField>
			<HighlightedDetailsField
				label='Issue name'
				value={Issue.name}
			/>
			<BaseDetailsField label='Issue description'>{Issue.description}</BaseDetailsField>
			{userLink ? (
				<LinkTile tileHref={userLink}>
					<AssociatedUserDetails User={User} />
				</LinkTile>
			) : (
				<AssociatedUserDetails User={User} />
			)}
		</>
	);
};
