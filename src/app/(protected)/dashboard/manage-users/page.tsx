import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth';

import { getUserSubset } from '@/data/user';

import DashboardWrapper from '@/components/dashboard/DashboardWrapper';
import DataTable from '@/components/data-tables/DataTable';
import { UserColumns } from '@/components/data-tables/columns/UserColumns';
import { userRoles } from '@/components/data-tables/filters';

const AdminManageUsersPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect('/dashboard');

	const users = await getUserSubset({
		id: true,
		name: true,
		email: true,
		role: true,
		emailVerified: true,
		lastSeen: true,
		image: true,
	});

	return (
		<DashboardWrapper
			headerTitle='Manage Users'
			buttonLabel='Back to the dashboard'
			buttonHref='/dashboard'
			buttonSize='full'
			buttonVariant='link'>
			<div className='mx-auto w-[95%]'>
				<DataTable
					columns={UserColumns}
					data={users}
					search='email'
					filter={{ title: 'Role', columnKey: 'role', options: userRoles }}
					visibility
					pagination
				/>
			</div>
		</DashboardWrapper>
	);
};

export default AdminManageUsersPage;
