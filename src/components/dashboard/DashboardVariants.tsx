import {
	getAppointmentCount,
	getAutoAppointmentDeletionStatus,
	getAutoAppointmentGenerationStatus,
} from '@/data/appointment';
import { getAutoBookingDeletionStatus, getBookingCount } from '@/data/booking';
import { getIssueCount } from '@/data/issue';
import { getUserCount } from '@/data/user';

import AppointmentAutoDeletionForm from '@/components/appointments/AppointmentAutoDeletionForm';
import AppointmentAutoGenerationForm from '@/components/appointments/AppointmentAutoGenerationForm';
import DashboardTile from '@/components/dashboard/DashboardTile';
import DashboardWrapper, { type DashboardWrapperProps } from '@/components/dashboard/DashboardWrapper';
import { LuCalendarClock, LuClock, LuKanbanSquare, LuUsers } from 'react-icons/lu';
import BookingAutoDeletionForm from '../bookings/AppointmentAutoDeletionForm';

type BaseDashboardProps = Pick<DashboardWrapperProps, 'children' | 'headerTitle' | 'size'>;

const BaseDashboard = ({ children, headerTitle, size }: BaseDashboardProps) => {
	return (
		<DashboardWrapper
			navigationTree={[{ nodeLabel: 'Dashboard', nodeHref: 'dashboard' }]}
			headerTitle={headerTitle}
			size={size}>
			{children}
		</DashboardWrapper>
	);
};

export const AdminDashboard = async () => {
	const autoAppointmentGeneration = await getAutoAppointmentGenerationStatus();
	const autoAppointmentDeletion = await getAutoAppointmentDeletionStatus();
	const autoBookingDeletion = await getAutoBookingDeletionStatus();

	const allUserCount = await getUserCount('all');
	const usersRegisteredInLastWeekCount = await getUserCount('lastWeek');

	const bookedAppointmentCount = await getAppointmentCount('booked');
	const availableAppointmentCount = await getAppointmentCount('available');

	const allIssueCount = await getIssueCount('all');
	const currentlyUsedIssueCount = await getIssueCount('currentlyUsed');

	const allBookingCount = await getBookingCount('all');
	const thisWeekBookingCount = await getBookingCount('forThisWeek');

	return (
		<BaseDashboard
			headerTitle='Admin dashbord'
			size='lg'>
			<div className='grid gap-2 p-4 md:grid-cols-2'>
				<AppointmentAutoGenerationForm autoAppointmentGenerationStatus={Boolean(autoAppointmentGeneration)} />
				<AppointmentAutoDeletionForm autoAppointmentDeletionStatus={Boolean(autoAppointmentDeletion)} />
				<BookingAutoDeletionForm autoBookingDeletionStatus={Boolean(autoBookingDeletion)} />
			</div>
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
		</BaseDashboard>
	);
};

export const EmployeeDashboard = () => {
	return (
		<BaseDashboard
			headerTitle='Employee dashbord'
			size='lg'>
			Employee
		</BaseDashboard>
	);
};

export const UserDashboard = () => {
	return (
		<BaseDashboard
			headerTitle='User dashbord'
			size='lg'>
			User
		</BaseDashboard>
	);
};
