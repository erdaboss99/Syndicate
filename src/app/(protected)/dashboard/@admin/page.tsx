import Link from 'next/link';

import { database } from '@/lib/database';

import DashboardWrapper from '@/components/dashboard/DashboardWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LuUsers } from 'react-icons/lu';

const AdminDashboardPage = async () => {
	const userCount = await database.user.aggregate({
		_count: {
			id: true,
		},
	});

	const registeredInLastWeek = await database.user.aggregate({
		_count: {
			id: true,
		},
		where: {
			createdAt: {
				gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
			},
		},
	});

	return (
		<DashboardWrapper headerTitle='Admin dashbord'>
			<div className='grid gap-4 p-4 md:grid-cols-2'>
				<Link href='/users'>
					<Card variant='tile'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-base md:text-lg'>Users</CardTitle>
							<LuUsers className='h-6 w-6 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<h4 className='text-xl font-bold'>{`${userCount._count.id} registered users`}</h4>
							<p className='text-xs text-muted-foreground md:text-sm'>{`${registeredInLastWeek._count.id} new users in the last week`}</p>
						</CardContent>
					</Card>
				</Link>
			</div>
		</DashboardWrapper>
	);
};

export default AdminDashboardPage;
