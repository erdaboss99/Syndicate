import { redirect } from 'next/navigation';

import { getBookings } from '@/data/booking';
import { getIssues } from '@/data/issue';
import { getCurrentUser } from '@/lib/auth';
import { DEFAULT_AUTHENTICATED_REDIRECT } from '@/routes';

import DataTable from '@/components/data-tables/DataTable';
import { BookingColumns } from '@/components/data-tables/columns/BookingColumns';
import { CardWrapper } from '@/components/general/CardWrapper';

const AdminManageBookingsPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect(DEFAULT_AUTHENTICATED_REDIRECT);

	const bookings = await getBookings({
		select: {
			id: true,
			description: true,
			createdAt: true,
			Appointment: { select: { id: true, startTime: true } },
			User: { select: { id: true, email: true } },
			Issue: { select: { id: true, name: true } },
		},
	});

	const issues = await getIssues({
		select: { id: true, name: true, description: true },
	});

	const filterOptions = issues.map((issue) => ({
		value: issue.id,
		label: issue.name,
	}));

	const bookingTableData = bookings.map((booking) => ({
		id: booking.id,
		description: booking.description,
		createdAt: booking.createdAt,
		appointmentId: booking.Appointment.id,
		appointmentStartTime: booking.Appointment.startTime,
		userId: booking.User.id,
		userEmail: booking.User.email,
		issueId: booking.Issue.id,
		issueName: booking.Issue.name,
	}));

	return (
		<CardWrapper
			navigationTree={[
				{ nodeLabel: 'Dashboard', nodeHref: 'dashboard' },
				{ nodeLabel: 'Manage bookings', nodeHref: 'manage-bookings' },
			]}
			headerTitle='Manage bookings'
			size='XL'
			linkLabel='Back to the dashboard'
			linkHref='/dashboard'>
			<div className='mx-auto w-[95%]'>
				<DataTable
					columns={BookingColumns}
					data={bookingTableData}
					search='userEmail'
					filter={{ title: 'Issue', columnKey: 'issueName', options: filterOptions }}
					visibility
					pagination
				/>
			</div>
		</CardWrapper>
	);
};

export default AdminManageBookingsPage;
