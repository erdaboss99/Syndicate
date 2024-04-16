import { redirect } from 'next/navigation';

import { getBookingDataSubset } from '@/data/booking';
import { getCurrentUser } from '@/lib/auth';
import {
	getIntervalFromDay,
	isAppointmentCurrentlyInProgress,
	isAppointmentExpired,
	isAppointmentUpComing,
} from '@/lib/date';

import BookingDetails from '@/components/bookings/BookingDetails';
import { CardWrapper } from '@/components/general/CardWrapper';
import { CardHeader } from '@/components/ui/Card';

const DailyBookingsPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role === 'USER') redirect('/dashboard');

	const todayInterval = getIntervalFromDay(new Date());

	const bookingData = await getBookingDataSubset({
		where: {
			Appointment: {
				startTime: {
					gte: todayInterval.start,
					lte: todayInterval.end,
				},
			},
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

	const expiredBookingData = bookingData.filter((booking) => isAppointmentExpired(booking.Appointment.startTime));
	const inProgressBookingData = bookingData.filter((booking) =>
		isAppointmentCurrentlyInProgress(booking.Appointment.startTime),
	);
	const upcomingBookingData = bookingData.filter((booking) => isAppointmentUpComing(booking.Appointment.startTime));

	return (
		<CardWrapper
			headerTitle='Daily bookings'
			size='XL'
			navigationTree={[
				{ nodeLabel: 'Dashboard', nodeHref: 'dashboard' },
				{ nodeLabel: 'Daily bookings', nodeHref: 'daily-bookings' },
			]}
			linkLabel='Back to the dashboard'
			linkHref='/dashboard'>
			<BookingCategory
				title='Expired'
				bookings={expiredBookingData}
			/>
			<BookingCategory
				title='In Progress'
				bookings={inProgressBookingData}
			/>
			<BookingCategory
				title='Upcoming'
				bookings={upcomingBookingData}
			/>
		</CardWrapper>
	);
};

type BookingCategoryProps = {
	title: string;
	bookings: {
		id: string;
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
	}[];
};

const BookingCategory = ({ title, bookings }: BookingCategoryProps) => {
	return (
		<>
			<CardHeader variant='secondary'>{title}</CardHeader>
			<div className='grid gap-4 p-4 md:grid-cols-2'>
				{bookings.map((booking) => (
					<div
						key={booking.id}
						className='h-fit space-y-4 rounded border'>
						<BookingDetails
							description={booking.description}
							createdAt={booking.createdAt}
							Issue={booking.Issue}
							Appointment={booking.Appointment}
							User={booking.User}
						/>
					</div>
				))}
			</div>
		</>
	);
};

export default DailyBookingsPage;
