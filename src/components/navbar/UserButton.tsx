import Link from 'next/link';

import { getCurrentUser } from '@/lib/auth';

import LogoutButton from '@/components/auth/LogoutButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { AiOutlineDashboard } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdExitToApp, MdOutlineManageAccounts } from 'react-icons/md';

const UserButton = async () => {
	const user = await getCurrentUser();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					size='nav'>
					<Avatar className='h-9 w-9'>
						<AvatarImage src={user?.image || ''} />
						<AvatarFallback className='bg-transparent'>
							<FaRegUserCircle className='h-8 w-8' />
						</AvatarFallback>
					</Avatar>
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
