import { redirect } from 'next/navigation';

import { getAppointmentDataSubset } from '@/data/appointment';
import { getCurrentUser } from '@/lib/auth';

import DataTable from '@/components/data-tables/DataTable';
import { AppointmentColumns } from '@/components/data-tables/columns/AppointmentColumns';
import { CardWrapper } from '@/components/general/CardWrapper';

const AdminManageAppointmentsPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect('/dashboard');

	const appointments = (
		await getAppointmentDataSubset({
			id: true,
			startTime: true,
			Booking: { select: { id: true } },
		})
	).map((appointment) => ({
		id: appointment.id,
		startTime: appointment.startTime,
		bookingId: appointment.Booking === null ? null : appointment.Booking.id,
	}));

	return (
		<CardWrapper
			headerTitle='Manage appointments'
			size='XL'
			navigationTree={[
				{ nodeLabel: 'Dashboard', nodeHref: 'dashboard' },
				{ nodeLabel: 'Manage appointments', nodeHref: 'manage-appointments' },
			]}
			linkLabel='Back to the dashboard'
			linkHref='/dashboard'>
			<div className='mx-auto w-[95%]'>
				<DataTable
					columns={AppointmentColumns}
					data={appointments}
					pagination
				/>
			</div>
		</CardWrapper>
	);
};

export default AdminManageAppointmentsPage;
