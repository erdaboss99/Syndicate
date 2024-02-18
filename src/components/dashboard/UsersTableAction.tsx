import ChangeRoleDropdown from '@/components/dashboard/ChangeRoleDropdown';
import { UsersDataTableFields } from '@/components/data-tables/columns/UserColumns';
import CopyToClipboard from '@/components/general/CopyToClipboardButton';
import { Button } from '@/components/ui/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { LuMoreHorizontal } from 'react-icons/lu';

type UsersTableActionProps = {
	user: UsersDataTableFields;
};

const UsersTableAction = ({ user }: UsersTableActionProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<LuMoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<CopyToClipboard value={user.email!}>
					<DropdownMenuItem>Copy user Email</DropdownMenuItem>
				</CopyToClipboard>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Change roles</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<ChangeRoleDropdown
							userId={user.id!}
							userRole={user.role!}
						/>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UsersTableAction;
