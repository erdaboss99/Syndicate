import { add } from 'date-fns';
import { type IconType } from 'react-icons/lib';
import { LuCalendarCheck2, LuCalendarClock, LuCalendarDays, LuClock, LuKanbanSquare, LuUsers } from 'react-icons/lu';

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
import { getCurrentUser } from '@/lib/auth';
import { getIntervalFromDay, getWeekIntervalFromDay } from '@/lib/date';

import AutoExpiredAppointmentDeletionForm from '@/components/dashboard/AutoExpiredAppointmentDeletionForm';
import AutoExpiredBookingDeletionForm from '@/components/dashboard/AutoExpiredBookingDeletionForm';
import AutoNewAppointmentGenerationForm from '@/components/dashboard/AutoNewAppointmentGenerationForm';
import SendAutoActionReportEmailForm from '@/components/dashboard/SendAutoActionReportEmailForm';
import { CardWrapper, type CardWrapperProps } from '@/components/general/CardWrapper';
import LinkTile, { type LinkTileProps } from '@/components/general/LinkTile';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const BaseDashboard = ({ children, size }: Omit<CardWrapperProps, 'navigationTree' | 'headerTitle'>) => {
	return (
		<CardWrapper
			navigationTree={[{ nodeLabel: 'Dashboard', nodeHref: 'dashboard' }]}
			headerTitle='Dashboard'
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

	const weekBeforeDate = add(new Date(), { weeks: -1 });
	const usersRegisteredInLastWeekCount = await aggregateUsers({
		aggregate: { _count: { id: true } },
		where: { createdAt: { gte: weekBeforeDate } },
	}).then((data) => data?._count.id);

	const allUserCount = await aggregateUsers({
		aggregate: { _count: { id: true } },
	}).then((data) => data?._count.id);

	const availableAppointmentCount = await aggregateAppointments({
		aggregate: { _count: { id: true } },
		where: { Booking: null },
	}).then((data) => data?._count.id);

	const bookedAppointmentCount = await aggregateAppointments({
		aggregate: { _count: { id: true } },
		where: { Booking: { id: { not: undefined } } },
	}).then((data) => data?._count.id);

	const currentlyUsedIssueCount = await aggregateIssues({
		aggregate: { _count: { id: true } },
		where: { bookings: { some: { id: { not: undefined } } } },
	}).then((data) => data?._count.id);

	const allIssueCount = await aggregateIssues({
		aggregate: { _count: { id: true } },
	}).then((data) => data?._count.id);

	const thisWeeksInterval = getWeekIntervalFromDay(new Date());
	const thisWeekBookingCount = await aggregateBookings({
		aggregate: { _count: { id: true } },
		where: { Appointment: { startTime: { gte: thisWeeksInterval.start, lte: thisWeeksInterval.end } } },
	}).then((data) => data?._count.id);

	const allBookingCount = await aggregateBookings({
		aggregate: { _count: { id: true } },
	}).then((data) => data?._count.id);

	return (
		<BaseDashboard size='LG'>
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

export const EmployeeDashboard = async () => {
	const todaysInterval = getIntervalFromDay(new Date());
	const upcomingBookingCount = await aggregateBookings({
		aggregate: { _count: { id: true } },
		where: { Appointment: { startTime: { gte: new Date(), lte: todaysInterval.end } } },
	}).then((data) => data?._count.id);

	const dailyBookingCount = await aggregateBookings({
		aggregate: { _count: { id: true } },
		where: { Appointment: { startTime: { gte: todaysInterval.start, lte: todaysInterval.end } } },
	}).then((data) => data?._count.id);

	return (
		<BaseDashboard size='LG'>
			<div className='grid gap-4 p-4 md:grid-cols-2'>
				<DashboardTile
					tileHref='/dashboard/daily-bookings'
					tileTitle='Daily bookings'
					tilePrimaryCount={`${upcomingBookingCount}`}
					tilePrimaryText=' upcoming bookings for today'
					tileSecondaryText={`${dailyBookingCount} bookings for today`}
					TileIcon={LuCalendarClock}
				/>
			</div>
		</BaseDashboard>
	);
};

export const UserDashboard = async () => {
	const user = await getCurrentUser();
	const threeDaysAheadDate = add(new Date(), { days: 3 });
	const nextDayDate = add(new Date(), { days: 1 });

	const availableAppointmentsInThreeDaysCount = await aggregateAppointments({
		aggregate: { _count: { id: true } },
		where: { startTime: { gte: new Date(), lte: threeDaysAheadDate }, Booking: null },
	}).then((data) => data?._count.id);

	const allAvailableAppointmentCount = await aggregateAppointments({
		aggregate: { _count: { id: true } },
		where: { startTime: { gte: new Date() }, Booking: null },
	}).then((data) => data?._count.id);

	const bookingInTheNextDay = await aggregateBookings({
		aggregate: { _count: { id: true } },
		where: { Appointment: { startTime: { gte: new Date(), lte: nextDayDate } }, User: { id: user?.id } },
	}).then((data) => data?._count.id);

	const allBookingCount = await aggregateBookings({
		aggregate: { _count: { id: true } },
		where: { User: { id: user?.id } },
	}).then((data) => data?._count.id);

	return (
		<BaseDashboard size='LG'>
			<div className='grid gap-4 p-4 md:grid-cols-2'>
				<DashboardTile
					tileDataTestId='dashboard-appointments-tile'
					tileHref='/appointments'
					tileTitle='Appointments'
					tilePrimaryCount={`${availableAppointmentsInThreeDaysCount}`}
					tilePrimaryText=' available appointments in the next 3 days'
					tileSecondaryText={`${allAvailableAppointmentCount} available appointments`}
					TileIcon={LuClock}
				/>
				<DashboardTile
					tileDataTestId='dashboard-bookings-tile'
					tileHref='/bookings'
					tileTitle='Bookings'
					tilePrimaryCount={`${bookingInTheNextDay}`}
					tilePrimaryText=' upcoming bookings in the next 24 hours'
					tileSecondaryText={`${allBookingCount} booked appointments`}
					TileIcon={LuCalendarCheck2}
				/>
			</div>
		</BaseDashboard>
	);
};

type DashboardTileProps = {
	tileTitle: string;
	tilePrimaryCount: string;
	tilePrimaryText: string;
	tileSecondaryText: string;
	tileDataTestId?: string;
	TileIcon: IconType;
} & Omit<LinkTileProps, 'children'>;

const DashboardTile = ({
	tileHref,
	tileTitle,
	tilePrimaryCount,
	tilePrimaryText,
	tileSecondaryText,
	tileDataTestId,
	TileIcon,
}: DashboardTileProps) => {
	return (
		<LinkTile tileHref={tileHref}>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-base md:text-lg'>{tileTitle}</CardTitle>
				<TileIcon className='h-6 w-6 text-muted-foreground' />
			</CardHeader>
			<CardContent
				className='p-3 md:p-6'
				data-testid={tileDataTestId}>
				<h4 className='text-xl'>
					<span className='font-bold text-primary'>{tilePrimaryCount}</span>
					{tilePrimaryText}
				</h4>
				<p className='text-xs text-muted-foreground md:text-sm'>{tileSecondaryText}</p>
			</CardContent>
		</LinkTile>
	);
};
