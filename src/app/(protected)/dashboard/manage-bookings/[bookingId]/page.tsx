import { redirect } from 'next/navigation';

import { getUniqueBookingDataSubset } from '@/data/booking';
import { getCurrentUser } from '@/lib/auth';
import { BookingDetailsQueryParamsSchema } from '@/schemas';

import { BookingDetails } from '@/components/bookings/BookingDetails';
import { CardWrapper } from '@/components/general/CardWrapper';
import ErrorCard from '@/components/general/ErrorCard';

const BookingDetailsPage = async ({ params }: { params: { bookingId: string } }) => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect('/dashboard');

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

	const bookingData = await getUniqueBookingDataSubset({
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
				<BookingDetails
					description={bookingData.description}
					createdAt={bookingData.createdAt}
					Issue={bookingData.Issue}
					Appointment={bookingData.Appointment}
					User={bookingData.User}
					userLink={`/dashboard/manage-users/${bookingData.User.id}`}
				/>
			</div>
		</CardWrapper>
	);
};

export default BookingDetailsPage;
