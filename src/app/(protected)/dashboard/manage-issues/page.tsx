import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth';

import DashboardWrapper from '@/components/dashboard/DashboardWrapper';
import IssueCard from '@/components/issues/IssueCard';
import { getIssues } from '@/data/issues';
import { Issue } from '@prisma/client';

const AdminManageIssuesPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect('/dashboard');

	const issues = await getIssues();

	return (
		<DashboardWrapper
			headerTitle='Manage issues'
			size='xl'
			buttonLabel='Back to the dashboard'
			buttonHref='/dashboard'
			buttonSize='full'
			buttonVariant='link'>
			<div className='grid grid-cols-2 place-items-center gap-5 md:grid-cols-3'>
				{issues.map((issue: Issue) => (
					<IssueCard
						key={issue.id}
						issue={issue}
					/>
				))}
			</div>
		</DashboardWrapper>
	);
};

export default AdminManageIssuesPage;
