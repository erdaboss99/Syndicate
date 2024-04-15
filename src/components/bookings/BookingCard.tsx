import { formatDate } from '@/lib/date';

import { BaseDetailsField } from '@/components/general/DetailsField';
import LinkTile from '@/components/general/LinkTile';

export type BookingCardProps = {
	id: string;
	description: string;
	Issue: {
		id: string;
		name: string;
	};
	Appointment: {
		id: string;
		startTime: Date;
	};
};

const BookingCard = ({ id, description, Issue, Appointment }: BookingCardProps) => {
	return (
		<LinkTile tileHref={`/dashboard/manage-bookings/${id}`}>
			<BaseDetailsField label='Appointment'>
				{formatDate(Appointment.startTime, 'WRITTEN_LONG_DATE_TIME')}
			</BaseDetailsField>
			<BaseDetailsField label='Description'>{description}</BaseDetailsField>
			<BaseDetailsField label='Issue name'>{Issue.name}</BaseDetailsField>
		</LinkTile>
	);
};

export default BookingCard;
