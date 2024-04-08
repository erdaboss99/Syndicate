import { getAppointmentCount } from '@/data/appointments';
import { getIssueCount } from '@/data/issues';
import { getUserCount } from '@/data/user';

import DashboardTile from '@/components/dashboard/DashboardTile';
import DashboardWrapper from '@/components/dashboard/DashboardWrapper';
import { LuClock, LuKanbanSquare, LuUsers } from 'react-icons/lu';

export const AdminDashboard = async () => {
	const userCount = await getUserCount('all');
	const usersRegisteredInLastWeekCount = await getUserCount('lastWeek');

	const bookedAppointmentCount = await getAppointmentCount('booked');
	const availableAppointmentCount = await getAppointmentCount('available');

	const allIssues = await getIssueCount('all');
	const currentlyUsedIssues = await getIssueCount('currentlyUsed');

	return (
		<DashboardWrapper headerTitle='Admin dashbord'>
			<div className='grid gap-4 p-4 md:grid-cols-2'>
				<DashboardTile
					tileHref='/dashboard/manage-users'
					tileTitle='Users'
					tilePrimaryCount={`${userCount}`}
					tilePrimaryText=' registered users'
					tileSecondaryText={`${usersRegisteredInLastWeekCount} registered in the last week`}
					TileIcon={LuUsers}
				/>

				<DashboardTile
					tileHref='/dashboard/manage-appointments'
					tileTitle='Appointments'
					tilePrimaryCount={`${availableAppointmentCount}`}
					tilePrimaryText=' available appointments'
					tileSecondaryText={`${bookedAppointmentCount} booked appointments`}
					TileIcon={LuClock}
				/>
				<DashboardTile
					tileHref='/dashboard/manage-issues'
					tileTitle='Issues'
					tilePrimaryCount={`${currentlyUsedIssues}`}
					tilePrimaryText=' currently used issues'
					tileSecondaryText={`${allIssues} existing issues`}
					TileIcon={LuKanbanSquare}
				/>
			</div>
		</DashboardWrapper>
	);
};

export const EmployeeDashboard = () => {
	return <DashboardWrapper headerTitle='Employee dashbord'>Employee</DashboardWrapper>;
};

export const UserDashboard = () => {
	return <DashboardWrapper headerTitle='User dashbord'>User</DashboardWrapper>;
};
