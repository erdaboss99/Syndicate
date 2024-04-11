import { redirect } from 'next/navigation';

import { getBookingSubset } from '@/data/booking';
import { getIssues } from '@/data/issue';
import { getCurrentUser } from '@/lib/auth';

import DashboardWrapper from '@/components/dashboard/DashboardWrapper';
import DataTable from '@/components/data-tables/DataTable';
import { BookingColumns } from '@/components/data-tables/columns/BookingColumns';

const AdminManageBookingsPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect('/dashboard');

	const bookings = await getBookingSubset({
		id: true,
		description: true,
		createdAt: true,
		Appointment: {
			select: {
				id: true,
				startTime: true,
			},
		},
		User: {
			select: {
				id: true,
				email: true,
			},
		},
		Issue: {
			select: {
				id: true,
				name: true,
			},
		},
	});

	const filterOptions = (await getIssues()).map((issue) => ({
		value: issue.id,
		label: issue.name,
	}));

	return (
		<DashboardWrapper
			headerTitle='Manage Bookings'
			size='xl'
			buttonLabel='Back to the dashboard'
			buttonHref='/dashboard'
			buttonSize='full'
			buttonVariant='link'>
			<div className='mx-auto w-[95%]'>
				<DataTable
					columns={BookingColumns}
					data={bookings}
					search='User_email'
					filter={{ title: 'Issue', columnKey: 'Issue_name', options: filterOptions }}
					visibility
					pagination
				/>
			</div>
		</DashboardWrapper>
	);
};

export default AdminManageBookingsPage;
