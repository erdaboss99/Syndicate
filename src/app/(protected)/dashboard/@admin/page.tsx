import Link from 'next/link';

import { getAppointmentCount } from '@/data/appointments';
import { getUserCount } from '@/data/user';

import DashboardWrapper from '@/components/dashboard/DashboardWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LuUsers } from 'react-icons/lu';

const AdminDashboardPage = async () => {
	const userCount = await getUserCount('all');
	const usersRegisteredInLastWeekCount = await getUserCount('lastWeek');

	const bookedAppointmentCount = await getAppointmentCount('booked');
	const availableAppointmentCount = await getAppointmentCount('available');

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
							<h4 className='text-xl'>
								<span className='font-bold text-primary'>{userCount}</span>
								{' registered users'}
							</h4>
							<p className='text-xs text-muted-foreground md:text-sm'>
								{`${usersRegisteredInLastWeekCount} new users in the last week`}
							</p>
						</CardContent>
					</Card>
				</Link>

				<Link href='/manage-appointments'>
					<Card variant='tile'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-base md:text-lg'>Appointments</CardTitle>
							<LuUsers className='h-6 w-6 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<h4 className='text-xl'>
								<span className='font-bold text-primary'>{availableAppointmentCount}</span>
								{' available appointments'}
							</h4>
							<p className='text-xs text-muted-foreground md:text-sm'>
								{`${bookedAppointmentCount} booked appointments`}
							</p>
						</CardContent>
					</Card>
				</Link>
			</div>
		</DashboardWrapper>
	);
};

export default AdminDashboardPage;
