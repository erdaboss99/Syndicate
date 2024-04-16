import { formatDate } from '@/lib/date';

import { BaseDetailsField, HighlightedDetailsField } from '@/components/general/DetailsField';
import LinkTile from '@/components/general/LinkTile';
import { Badge } from '@/components/ui/Badge';
import { CardHeader } from '@/components/ui/Card';

type UserDetailsProps = {
	User: {
		id: string;
		name: string;
		email: string;
	};
};

const UserDetails = ({ User }: UserDetailsProps) => {
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

export type BookingDetailsProps = {
	userLink?: string;
	description: string;
	createdAt: Date;
	Issue: {
		name: string;
		description: string;
	};
	Appointment: {
		startTime: Date;
	};
} & UserDetailsProps;

const BookingDetails = ({ description, createdAt, Issue, Appointment, User, userLink }: BookingDetailsProps) => {
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
					<UserDetails User={User} />
				</LinkTile>
			) : (
				<UserDetails User={User} />
			)}
		</>
	);
};

export default BookingDetails;
