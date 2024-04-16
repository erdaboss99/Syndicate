import { redirect } from 'next/navigation';

import { getIssues } from '@/data/issue';
import { getCurrentUser } from '@/lib/auth';

import { CardWrapper } from '@/components/general/CardWrapper';
import { IssueCard, NewIssueCard } from '@/components/issues/IssueCard';

const AdminManageIssuesPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect('/dashboard');

	const issues = await getIssues({
		select: {
			id: true,
			name: true,
			description: true,
			bookings: { select: { id: true } },
		},
	});

	return (
		<CardWrapper
			navigationTree={[
				{ nodeLabel: 'Dashboard', nodeHref: 'dashboard' },
				{ nodeLabel: 'Manage issues', nodeHref: 'manage-issues' },
			]}
			headerTitle='Manage issues'
			size='XL'
			linkLabel='Back to the dashboard'
			linkHref='/dashboard'>
			<div className='grid grid-cols-1 place-items-center gap-5 md:grid-cols-3'>
				<NewIssueCard />
				{issues.map((issue) => (
					<IssueCard
						key={issue.id}
						issue={issue}
					/>
				))}
			</div>
		</CardWrapper>
	);
};

export default AdminManageIssuesPage;
