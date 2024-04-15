import { redirect } from 'next/navigation';

import { UserRole } from '@prisma/client';

import { getUserDataSubset } from '@/data/user';
import { getCurrentUser } from '@/lib/auth';

import DashboardWrapper from '@/components/dashboard/DashboardWrapper';
import DataTable from '@/components/data-tables/DataTable';
import { UserColumns } from '@/components/data-tables/columns/UserColumns';

const AdminManageUsersPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect('/dashboard');

	const users = await getUserDataSubset({
		id: true,
		name: true,
		email: true,
		role: true,
		emailVerified: true,
		lastSeen: true,
		image: true,
	});

	const filterOptions = Object.values(UserRole).map((role) => ({
		value: role,
		label: role[0].toUpperCase() + role.slice(1).toLowerCase(),
	}));

	return (
		<DashboardWrapper
			navigationTree={[
				{ nodeLabel: 'Dashboard', nodeHref: 'dashboard' },
				{ nodeLabel: 'Manage users', nodeHref: 'manage-users' },
			]}
			headerTitle='Manage users'
			size='XL'
			buttonLabel='Back to the dashboard'
			buttonHref='/dashboard'
			buttonSize='full'
			buttonVariant='link'>
			<div className='mx-auto w-[95%]'>
				<DataTable
					columns={UserColumns}
					data={users}
					search='email'
					filter={{ title: 'Role', columnKey: 'role', options: filterOptions }}
					visibility
					pagination
				/>
			</div>
		</DashboardWrapper>
	);
};

export default AdminManageUsersPage;
