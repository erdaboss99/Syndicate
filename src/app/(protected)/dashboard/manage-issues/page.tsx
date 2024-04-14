import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth';

import DashboardWrapper from '@/components/dashboard/DashboardWrapper';
import { IssueCard, NewIssueCard } from '@/components/issues/IssueCard';
import { getIssues } from '@/data/issue';
import { type Issue } from '@prisma/client';

const AdminManageIssuesPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect('/dashboard');

	const issues = await getIssues();

	return (
		<DashboardWrapper
			navigationTree={[
				{ nodeLabel: 'Dashboard', nodeHref: 'dashboard' },
				{ nodeLabel: 'Manage issues', nodeHref: 'manage-issues' },
			]}
			headerTitle='Manage issues'
			size='XL'
			buttonLabel='Back to the dashboard'
			buttonHref='/dashboard'
			buttonSize='full'
			buttonVariant='link'>
			<div className='grid grid-cols-1 place-items-center gap-5 md:grid-cols-3'>
				<NewIssueCard />
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
