import { redirect } from 'next/navigation';

import { getSelectedBookingDataSubset } from '@/data/booking';
import { getCurrentUser } from '@/lib/auth';
import { BookingDetailsQueryParamsSchema } from '@/schemas';

import BookingDetails from '@/components/bookings/BookingDetails';
import DashboardWrapper from '@/components/dashboard/DashboardWrapper';
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
				buttonLabel='Back to manage bookings'
				buttonVariant='default'
				buttonSize='lg'
				buttonHref='/dashboard/manage-bookings'
			/>
		);

	const bookingData = await getSelectedBookingDataSubset({
		id: paramsData.data,
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
				buttonLabel='Back to manage bookings'
				buttonVariant='default'
				buttonSize='lg'
				buttonHref='/dashboard/manage-bookings'
			/>
		);

	return (
		<DashboardWrapper
			navigationTree={[
				{ nodeLabel: 'Dashboard', nodeHref: 'dashboard' },
				{ nodeLabel: 'Manage bookings', nodeHref: 'manage-bookings' },
				{ nodeLabel: 'Booking details', nodeHref: bookingData.id },
			]}
			headerTitle='Booking details'
			size='SM'
			buttonLabel='Back to manage bookings'
			buttonHref='/dashboard/manage-booking'
			buttonSize='full'
			buttonVariant='link'>
			<div className='space-y-4'>
				<BookingDetails
					description={bookingData.description}
					createdAt={bookingData.createdAt}
					Issue={bookingData.Issue}
					Appointment={bookingData.Appointment}
					User={{ ...bookingData.User, name: bookingData.User.name!, email: bookingData.User.email! }}
				/>
			</div>
		</DashboardWrapper>
	);
};

export default BookingDetailsPage;
