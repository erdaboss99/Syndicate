import { getAppointmentCount } from '@/data/appointment';
import { getBookingCount } from '@/data/booking';
import { getIssueCount } from '@/data/issue';
import { getUserCount } from '@/data/user';

import DashboardTile from '@/components/dashboard/DashboardTile';
import DashboardWrapper from '@/components/dashboard/DashboardWrapper';
import { LuCalendarClock, LuClock, LuKanbanSquare, LuUsers } from 'react-icons/lu';

export const AdminDashboard = async () => {
	const allUserCount = await getUserCount('all');
	const usersRegisteredInLastWeekCount = await getUserCount('lastWeek');

	const bookedAppointmentCount = await getAppointmentCount('booked');
	const availableAppointmentCount = await getAppointmentCount('available');

	const allIssueCount = await getIssueCount('all');
	const currentlyUsedIssueCount = await getIssueCount('currentlyUsed');

	const allBookingCount = await getBookingCount('all');
	const thisWeekBookingCount = await getBookingCount('forThisWeek');

	return (
		<DashboardWrapper
			headerTitle='Admin dashbord'
			size='lg'>
			<div className='grid gap-4 p-4 md:grid-cols-2'>
				<DashboardTile
					tileHref='/dashboard/manage-users'
					tileTitle='Users'
					tilePrimaryCount={`${usersRegisteredInLastWeekCount}`}
					tilePrimaryText=' registered in the last week'
					tileSecondaryText={`${allUserCount} registered users`}
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
					tilePrimaryCount={`${currentlyUsedIssueCount}`}
					tilePrimaryText=' currently used issues'
					tileSecondaryText={`${allIssueCount} existing issues`}
					TileIcon={LuKanbanSquare}
				/>
				<DashboardTile
					tileHref='/dashboard/manage-bookings'
					tileTitle='Bookings'
					tilePrimaryCount={`${thisWeekBookingCount}`}
					tilePrimaryText=' bookings for this week'
					tileSecondaryText={`${allBookingCount} existing bookings`}
					TileIcon={LuCalendarClock}
				/>
			</div>
		</DashboardWrapper>
	);
};

export const EmployeeDashboard = () => {
	return (
		<DashboardWrapper
			headerTitle='Employee dashbord'
			size='lg'>
			Employee
		</DashboardWrapper>
	);
};

export const UserDashboard = () => {
	return (
		<DashboardWrapper
			headerTitle='User dashbord'
			size='lg'>
			User
		</DashboardWrapper>
	);
};
