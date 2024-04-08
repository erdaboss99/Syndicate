import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth';

import DashboardWrapper from '@/components/dashboard/DashboardWrapper';

const AdminManageIssuesPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect('/dashboard');

	return (
		<DashboardWrapper
			headerTitle='Manage issues'
			buttonLabel='Back to the dashboard'
			buttonHref='/dashboard'
			buttonSize='full'
			buttonVariant='link'>
			<div className='flex w-full flex-col space-y-8 px-4'>Manage Issues</div>
		</DashboardWrapper>
	);
};

export default AdminManageIssuesPage;
