import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth';

import { database } from '@/lib/database';

import AppointmentGenerator from '@/components/appointments/AppointmentGenerator';
import AppointmentWrapper from '@/components/appointments/AppointmentWrapper';
import DataTable from '@/components/data-tables/DataTable';
import { AdminAppointmentColumns } from '@/components/data-tables/columns/AdminAppointmentColumns';

const AdminManageAppointmentsPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect('/dashboard');

	const appointments = await database.appointment.findMany();

	return (
		<AppointmentWrapper
			size='lg'
			headerTitle='Manage Appointments'>
			<div className='flex w-full flex-col px-4'>
				<AppointmentGenerator />
				<DataTable
					columns={AdminAppointmentColumns}
					data={appointments}
					pagination
				/>
			</div>
		</AppointmentWrapper>
	);
};

export default AdminManageAppointmentsPage;
