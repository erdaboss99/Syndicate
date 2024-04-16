import { redirect } from 'next/navigation';

import { getBookings } from '@/data/booking';
import { getIssues } from '@/data/issue';
import { getCurrentUser } from '@/lib/auth';

import DataTable from '@/components/data-tables/DataTable';
import { BookingColumns } from '@/components/data-tables/columns/BookingColumns';
import { CardWrapper } from '@/components/general/CardWrapper';

const AdminManageBookingsPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect('/dashboard');

	const bookings = await getBookings({
		select: {
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
		},
	});

	const issues = await getIssues({
		select: {
			id: true,
			name: true,
			description: true,
		},
	});

	const filterOptions = issues.map((issue) => ({
		value: issue.id,
		label: issue.name,
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
					data={bookings}
					search='User_email'
					filter={{ title: 'Issue', columnKey: 'Issue_name', options: filterOptions }}
					visibility
					pagination
				/>
			</div>
		</CardWrapper>
	);
};

export default AdminManageBookingsPage;
