import { LuCalendarClock, LuCalendarDays, LuKanbanSquare, LuUsers } from 'react-icons/lu';

import { aggregateAppointments } from '@/data/appointment';
import { aggregateBookings } from '@/data/booking';
import {
	getAutoExpiredAppointmentDeletionStatus,
	getAutoExpiredBookingDeletionStatus,
	getAutoNewAppointmentGenerationStatus,
	getSendAutoActionReportEmailStatus,
} from '@/data/configuration';
import { aggregateIssues } from '@/data/issue';
import { aggregateUsers } from '@/data/user';
import { getWeekIntervalFromDay } from '@/lib/date';

import AutoExpiredAppointmentDeletionForm from '@/components/dashboard/AutoExpiredAppointmentDeletionForm';
import AutoExpiredBookingDeletionForm from '@/components/dashboard/AutoExpiredBookingDeletionForm';
import AutoNewAppointmentGenerationForm from '@/components/dashboard/AutoNewAppointmentGenerationForm';
import DashboardTile from '@/components/dashboard/DashboardTile';
import SendAutoActionReportEmailForm from '@/components/dashboard/SendAutoActionReportEmailForm';
import { CardWrapper, type CardWrapperProps } from '@/components/general/CardWrapper';
import { CardHeader } from '@/components/ui/Card';

const BaseDashboard = ({ children, headerTitle, size }: Omit<CardWrapperProps, 'navigationTree'>) => {
	return (
		<CardWrapper
			navigationTree={[{ nodeLabel: 'Dashboard', nodeHref: 'dashboard' }]}
			headerTitle={headerTitle}
			size={size}>
			{children}
		</CardWrapper>
	);
};

export const AdminDashboard = async () => {
	const autoNewAppointmentGenerationStatus = await getAutoNewAppointmentGenerationStatus();
	const autoExpiredAppointmentDeletionStatus = await getAutoExpiredAppointmentDeletionStatus();
	const autoExpiredBookingDeletionStatus = await getAutoExpiredBookingDeletionStatus();
	const sendAutoActionReportEmailStatus = await getSendAutoActionReportEmailStatus();

	const allUserCount = await aggregateUsers({
		aggregate: { _count: { id: true } },
	}).then((data) => data?._count.id);

	const usersRegisteredInLastWeekCount = await aggregateUsers({
		aggregate: { _count: { id: true } },
		where: { createdAt: { gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000) } },
	}).then((data) => data?._count.id);

	const bookedAppointmentCount = await aggregateAppointments({
		aggregate: { _count: { id: true } },
		where: { Booking: { id: { not: undefined } } },
	}).then((data) => data?._count.id);

	const availableAppointmentCount = await aggregateAppointments({
		aggregate: { _count: { id: true } },
		where: { Booking: null },
	}).then((data) => data?._count.id);

	const allIssueCount = await aggregateIssues({
		aggregate: { _count: { id: true } },
	}).then((data) => data?._count.id);

	const currentlyUsedIssueCount = await aggregateIssues({
		aggregate: { _count: { id: true } },
		where: { bookings: { some: { id: { not: undefined } } } },
	}).then((data) => data?._count.id);

	const allBookingCount = await aggregateBookings({
		aggregate: { _count: { id: true } },
	}).then((data) => data?._count.id);

	const thisWeeksInterval = getWeekIntervalFromDay(new Date());
	const thisWeekBookingCount = await aggregateBookings({
		aggregate: { _count: { id: true } },
		where: { Appointment: { startTime: { gte: thisWeeksInterval.start, lte: thisWeeksInterval.end } } },
	}).then((data) => data?._count.id);

	return (
		<BaseDashboard
			headerTitle='Admin dashbord'
			size='LG'>
			<div className='grid gap-2 p-4 md:grid-cols-2'>
				<AutoNewAppointmentGenerationForm
					autoNewAppointmentGenerationStatus={Boolean(autoNewAppointmentGenerationStatus)}
				/>
				<AutoExpiredAppointmentDeletionForm
					autoExpiredAppointmentDeletionStatus={Boolean(autoExpiredAppointmentDeletionStatus)}
				/>
				<AutoExpiredBookingDeletionForm
					autoExpiredBookingDeletionStatus={Boolean(autoExpiredBookingDeletionStatus)}
				/>
				<SendAutoActionReportEmailForm
					sendAutoActionReportEmailStatus={Boolean(sendAutoActionReportEmailStatus)}
				/>
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
					TileIcon={LuCalendarDays}
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
			size='LG'>
			<CardHeader variant='tertiary'>asd</CardHeader>
		</BaseDashboard>
	);
};

export const UserDashboard = () => {
	return (
		<BaseDashboard
			headerTitle='User dashbord'
			size='LG'>
			User
		</BaseDashboard>
	);
};
