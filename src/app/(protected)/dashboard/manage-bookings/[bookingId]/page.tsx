import { redirect } from 'next/navigation';

import { getUniqueBooking } from '@/data/booking';
import { getCurrentUser } from '@/lib/auth';
import { formatDate } from '@/lib/date';
import { DEFAULT_AUTHENTICATED_REDIRECT } from '@/routes';
import { BookingDetailsQueryParamsSchema } from '@/schemas';

import { CardWrapper } from '@/components/general/CardWrapper';
import { BaseDetailsField, HighlightedDetailsField } from '@/components/general/DetailsField';
import ErrorCard from '@/components/general/ErrorCard';
import LinkTile from '@/components/general/LinkTile';
import { Badge } from '@/components/ui/Badge';
import { CardHeader } from '@/components/ui/Card';

const BookingDetailsPage = async ({ params }: { params: { bookingId: string } }) => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect(DEFAULT_AUTHENTICATED_REDIRECT);

	const { bookingId } = params;
	const paramsData = BookingDetailsQueryParamsSchema.safeParse(bookingId);

	if (!paramsData.success)
		return (
			<ErrorCard
				headerTitle='Invalid data'
				message={paramsData.error.errors[0].message}
				linkLabel='Back to manage bookings'
				linkHref='/dashboard/manage-bookings'
			/>
		);

	const bookingData = await getUniqueBooking({
		where: {
			id: paramsData.data,
		},
		select: {
			id: true,
			description: true,
			createdAt: true,
			Issue: {
				select: {
					name: true,
					description: true,
				},
			},
			Appointment: {
				select: {
					startTime: true,
				},
			},
			User: {
				select: {
					id: true,
					name: true,
					email: true,
				},
			},
		},
	});

	if (!bookingData)
		return (
			<ErrorCard
				headerTitle='Invalid data'
				message='Booking not found'
				linkLabel='Back to manage bookings'
				linkHref='/dashboard/manage-bookings'
			/>
		);

	return (
		<CardWrapper
			navigationTree={[
				{ nodeLabel: 'Dashboard', nodeHref: 'dashboard' },
				{ nodeLabel: 'Manage bookings', nodeHref: 'manage-bookings' },
				{ nodeLabel: 'Booking details', nodeHref: bookingData.id },
			]}
			headerTitle='Booking details'
			size='SM'
			linkLabel='Back to manage bookings'
			linkHref='/dashboard/manage-bookings'>
			<div className='space-y-4'>
				<HighlightedDetailsField
					label='Appointment'
					value={formatDate(bookingData.Appointment.startTime, 'WRITTEN_LONG_DATE_TIME')}
				/>
				<BaseDetailsField label='Description'>{bookingData.description}</BaseDetailsField>
				<BaseDetailsField label='Created at'>
					<Badge variant='outline'>{formatDate(bookingData.createdAt, 'WRITTEN_SHORT_DATE_TIME')}</Badge>
				</BaseDetailsField>
				<HighlightedDetailsField
					label='Issue name'
					value={bookingData.Issue.name}
				/>
				<BaseDetailsField label='Issue description'>{bookingData.Issue.description}</BaseDetailsField>
				<LinkTile tileHref={`/dashboard/manage-users/${bookingData.User.id}`}>
					<CardHeader variant='tertiary'>User details</CardHeader>
					<HighlightedDetailsField
						label='User name'
						value={bookingData.User.name}
					/>
					<HighlightedDetailsField
						label='User email'
						value={bookingData.User.email}
					/>
				</LinkTile>
			</div>
		</CardWrapper>
	);
};

export default BookingDetailsPage;
