import { redirect } from 'next/navigation';

import { getAppointmentDataSubset } from '@/data/appointment';
import { getCurrentUser } from '@/lib/auth';

import DashboardWrapper from '@/components/dashboard/DashboardWrapper';
import DataTable from '@/components/data-tables/DataTable';
import { AppointmentColumns } from '@/components/data-tables/columns/AppointmentColumns';

const AdminManageAppointmentsPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect('/dashboard');

	const appointments = await getAppointmentDataSubset({ id: true, startTime: true, Booking: true });

	return (
		<DashboardWrapper
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
		</DashboardWrapper>
	);
};

export default AdminManageAppointmentsPage;
