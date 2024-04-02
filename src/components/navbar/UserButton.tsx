import Link from 'next/link';

import { getCurrentUser } from '@/lib/auth';

import { type UserRole } from '@prisma/client';

import { type IconType } from 'react-icons/lib';

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
import { AiOutlineDashboard } from 'react-icons/ai';
import { CgDarkMode } from 'react-icons/cg';
import { MdExitToApp, MdOutlineManageAccounts } from 'react-icons/md';

const NavRecords: Omit<NavItemProps, 'currentRole'>[] = [
	{ name: 'Account', href: '/account', roles: ['ADMIN', 'EMPLOYEE', 'USER'], Icon: MdOutlineManageAccounts },
	{ name: 'Dashboard', href: '/dashboard', roles: ['ADMIN', 'EMPLOYEE', 'USER'], Icon: AiOutlineDashboard },
];

type NavItemProps = {
	name: string;
	href: string;
	Icon: IconType;
	roles: UserRole[];
	currentRole: UserRole;
};

const Navitem = ({ name, href, Icon, roles, currentRole }: NavItemProps) => {
	if (!roles.includes(currentRole)) return null;
	return (
		<Link href={href}>
			<DropdownMenuItem>
				<Icon className='mr-3 h-6 w-6' />
				{name}
			</DropdownMenuItem>
		</Link>
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
				className='w-40'
				align='end'>
				{NavRecords.map((item) => (
					<Navitem
						key={item.href}
						name={item.name}
						href={item.href}
						roles={item.roles}
						currentRole={user?.role!}
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
