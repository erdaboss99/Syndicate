import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth';

import { database } from '@/lib/database';

import DataTable from '@/components/data-tables/DataTable';
import { UserColumns } from '@/components/data-tables/columns/UserColumns';
import { userRoles } from '@/components/data-tables/filters';
import CardWrapper from '@/components/general/CardWrapper';

const AdminUsersPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect('/dashboard');

	const users = await database.user.findMany();

	return (
		<CardWrapper
			headerTitle='Users'
			size='lg'>
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
		</CardWrapper>
	);
};

export default AdminUsersPage;
