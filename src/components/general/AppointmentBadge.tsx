import { LuUserCheck, LuUserX } from 'react-icons/lu';

import { Badge, BadgeProps } from '@/components/ui/Badge';

type AppointmentBadgeProps = {
	bookingId: string | undefined;
	badgeVariant: BadgeProps['variant'];
};

const AppointmentBadge = ({ bookingId, badgeVariant }: AppointmentBadgeProps) => {
	return <Badge variant={badgeVariant}>{bookingId === undefined ? <AvailableBadge /> : <BookedBadge />}</Badge>;
};

const AvailableBadge = () => {
	return (
		<>
			<LuUserCheck
				className='mr-2'
				size={16}
			/>
			Available
		</>
	);
};

const BookedBadge = () => {
	return (
		<>
			<LuUserX
				className='mr-2'
				size={16}
			/>
			Booked
		</>
	);
};

export default AppointmentBadge;
