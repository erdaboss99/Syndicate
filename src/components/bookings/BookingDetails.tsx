import { formatDate } from '@/lib/date';

import { BaseDetailsField, HighlightedDetailsField } from '@/components/general/DetailsField';
import LinkTile from '@/components/general/LinkTile';
import { Badge } from '@/components/ui/Badge';
import { CardHeader } from '@/components/ui/Card';

type BookingDetailsProps = {
	description: string;
	createdAt: Date;
	Issue: {
		name: string;
		description: string;
	};
	Appointment: {
		startTime: Date;
	};
	User: {
		id: string;
		name: string;
		email: string;
	};
};

const BookingDetails = ({ description, createdAt, Issue, Appointment, User }: BookingDetailsProps) => {
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
			<div>
				<LinkTile tileHref={`/dashboard/manage-users/${User.id}`}>
					<CardHeader variant='tertiary'>User details</CardHeader>
					<HighlightedDetailsField
						label='User name'
						value={User.name}
					/>
					<HighlightedDetailsField
						label='User email'
						value={User.email}
					/>
				</LinkTile>
			</div>
		</>
	);
};

export default BookingDetails;
