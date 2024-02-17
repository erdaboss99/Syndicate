import Link from 'next/link';

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
import { AiOutlineDashboard } from 'react-icons/ai';
import { CgDarkMode } from 'react-icons/cg';
import { MdExitToApp, MdOutlineManageAccounts } from 'react-icons/md';

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
				<Link href='/account'>
					<DropdownMenuItem>
						<MdOutlineManageAccounts className='mr-3 h-6 w-6' />
						Account
					</DropdownMenuItem>
				</Link>
				<Link href='/dashboard'>
					<DropdownMenuItem>
						<AiOutlineDashboard className='mr-3 h-6 w-6' />
						Dashboard
					</DropdownMenuItem>
				</Link>
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
