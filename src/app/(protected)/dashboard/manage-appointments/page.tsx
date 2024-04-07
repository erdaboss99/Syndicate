import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth';

import { getAppointments, getAutoAppointmentGenerationStatus } from '@/data/appointments';

import AppointmentSettingsForm from '@/components/appointments/AppointmentSettingsForm';
import DashboardWrapper from '@/components/dashboard/DashboardWrapper';
import DataTable from '@/components/data-tables/DataTable';
import { AdminAppointmentColumns } from '@/components/data-tables/columns/AdminAppointmentColumns';

const AdminManageAppointmentsPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect('/dashboard');

	const appointments = await getAppointments();

	const autoAppointmentGeneration = await getAutoAppointmentGenerationStatus();

	return (
		<DashboardWrapper headerTitle='Manage Appointments'>
			<div className='flex w-full flex-col space-y-8 px-4'>
				<AppointmentSettingsForm autoAppointmentGenerationStatus={Boolean(autoAppointmentGeneration)} />
				<DataTable
					columns={AdminAppointmentColumns}
					data={appointments}
					pagination
				/>
			</div>
		</DashboardWrapper>
	);
};

export default AdminManageAppointmentsPage;
