import Link from 'next/link';

import { type UserRole } from '@prisma/client';
import { AiOutlineDashboard } from 'react-icons/ai';
import { CgDarkMode } from 'react-icons/cg';
import { type IconType } from 'react-icons/lib';
import {
	LuCalendarCheck2,
	LuCalendarClock,
	LuCalendarDays,
	LuCalendarRange,
	LuClock,
	LuKanbanSquare,
	LuUsers,
} from 'react-icons/lu';
import { MdExitToApp, MdOutlineManageAccounts } from 'react-icons/md';

import { getCurrentUser } from '@/lib/auth';

import LogoutButton from '@/components/auth/LogoutButton';
import UserAvatar from '@/components/general/UserAvatar';
import ThemeToggle from '@/components/navbar/ThemeToggle';
import { Button } from '@/components/ui/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

const MIN_ADMIN_ROUTE: UserRole[] = ['ADMIN'];
const MIN_EMPLOYEE_ROUTE: UserRole[] = ['ADMIN', 'EMPLOYEE'];
const MIN_USER_ROUTE: UserRole[] = ['ADMIN', 'EMPLOYEE', 'USER'];

const NavRecords: Omit<NavItemProps, 'currentRole'>[] = [
	{
		name: 'Account',
		href: '/account',
		roles: MIN_USER_ROUTE,
		Icon: MdOutlineManageAccounts,
		separate: false,
	},
	{
		name: 'Dashboard',
		href: '/dashboard',
		roles: MIN_USER_ROUTE,
		Icon: AiOutlineDashboard,
		separate: true,
	},
	{
		name: 'Manage users',
		href: '/dashboard/manage-users',
		roles: MIN_ADMIN_ROUTE,
		Icon: LuUsers,
		separate: true,
	},
	{
		name: 'Manage appointments',
		href: '/dashboard/manage-appointments',
		roles: MIN_ADMIN_ROUTE,
		Icon: LuCalendarDays,
		separate: false,
	},
	{
		name: 'Manage issues',
		href: '/dashboard/manage-issues',
		roles: MIN_ADMIN_ROUTE,
		Icon: LuKanbanSquare,
		separate: false,
	},
	{
		name: 'Manage bookings',
		href: '/dashboard/manage-bookings',
		roles: MIN_ADMIN_ROUTE,
		Icon: LuCalendarClock,
		separate: false,
	},
	{
		name: 'Daily bookings',
		href: '/dashboard/daily-bookings',
		roles: MIN_EMPLOYEE_ROUTE,
		Icon: LuCalendarRange,
		separate: true,
	},
	{
		name: 'Appointments',
		href: '/appointments',
		roles: ['ADMIN', 'EMPLOYEE', 'USER'],
		Icon: LuClock,
		separate: true,
	},
	{
		name: 'Booked appointments',
		href: '/bookings',
		roles: ['ADMIN', 'EMPLOYEE', 'USER'],
		Icon: LuCalendarCheck2,
		separate: true,
	},
];

type NavItemProps = {
	name: string;
	href: string;
	Icon: IconType;
	roles: UserRole[];
	separate: boolean;
	currentRole: UserRole;
};

const Navitem = ({ name, href, Icon, roles, separate, currentRole }: NavItemProps) => {
	if (!roles.includes(currentRole)) return null;
	return (
		<>
			{separate && <DropdownMenuSeparator />}
			<Link href={href}>
				<DropdownMenuItem>
					<Icon className='mr-3 h-6 w-6' />
					{name}
				</DropdownMenuItem>
			</Link>
		</>
	);
};

const UserButton = async () => {
	const user = await getCurrentUser();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					size='nav'>
					<UserAvatar src={user?.image!} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-52'
				align='end'>
				{NavRecords.map((item) => (
					<Navitem
						key={item.href}
						name={item.name}
						href={item.href}
						roles={item.roles}
						currentRole={user?.role!}
						separate={item.separate}
						Icon={item.Icon}
					/>
				))}

				<DropdownMenuSeparator />

				<ThemeToggle>
					<DropdownMenuItem>
						<CgDarkMode className='mr-3 h-6 w-6' />
						Switch theme
					</DropdownMenuItem>
				</ThemeToggle>

				<DropdownMenuSeparator />

				<LogoutButton>
					<DropdownMenuItem>
						<MdExitToApp className='mr-3 h-6 w-6' />
						Log out
					</DropdownMenuItem>
				</LogoutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserButton;
