import Link from 'next/link';

import { getCurrentUser } from '@/lib/auth';

import LogoutButton from '@/components/auth/LogoutButton';
import ThemeToggle from '@/components/general/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { AiOutlineDashboard } from 'react-icons/ai';
import { CgDarkMode } from 'react-icons/cg';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdExitToApp, MdOutlineManageAccounts } from 'react-icons/md';

const UserButton = async () => {
	const user = await getCurrentUser();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className='h-10 w-10'>
					<AvatarImage src={user?.image || ''} />
					<AvatarFallback>
						<FaRegUserCircle className='h-8 w-8' />
					</AvatarFallback>
				</Avatar>
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
						Toggle theme
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
