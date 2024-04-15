import { redirect } from 'next/navigation';

import { getBookingDataSubset } from '@/data/booking';
import { getIssues } from '@/data/issue';
import { getCurrentUser } from '@/lib/auth';

import DataTable from '@/components/data-tables/DataTable';
import { BookingColumns } from '@/components/data-tables/columns/BookingColumns';
import { CardWrapper } from '@/components/general/CardWrapper';

const AdminManageBookingsPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect('/dashboard');

	const bookings = await getBookingDataSubset({
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
