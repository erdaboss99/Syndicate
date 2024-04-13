import { redirect } from 'next/navigation';

import { getAppointmentSubset } from '@/data/appointment';
import { getCurrentUser } from '@/lib/auth';

import DashboardWrapper from '@/components/dashboard/DashboardWrapper';
import DataTable from '@/components/data-tables/DataTable';
import { AppointmentColumns } from '@/components/data-tables/columns/AppointmentColumns';

const AdminManageAppointmentsPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect('/dashboard');

	const appointments = await getAppointmentSubset({ id: true, startTime: true, Booking: true });

	return (
		<DashboardWrapper
			headerTitle='Manage appointments'
			size='xl'
			navigationTree={[
				{ nodeLabel: 'Dashboard', nodeHref: 'dashboard' },
				{ nodeLabel: 'Manage appointments', nodeHref: 'manage-appointments' },
			]}
			buttonLabel='Back to the dashboard'
			buttonHref='/dashboard'
			buttonSize='full'
			buttonVariant='link'>
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
