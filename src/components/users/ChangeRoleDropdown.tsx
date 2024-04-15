'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { UserRole } from '@prisma/client';
import { toast } from 'sonner';

import { changeRole } from '@/actions/account';
import { ACTION_DEFAULT_ERROR } from '@/constants';

import { UserRoleBadge } from '@/components/general/CustomBadge';
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/DropdownMenu';

type ChangeRoleDropdownProps = {
	userId: string;
	userRole: UserRole;
};

const ChangeRoleDropdown = ({ userId, userRole }: ChangeRoleDropdownProps) => {
	const [isPending, startTransition] = useTransition();
	const roles = Object.values(UserRole);
	const router = useRouter();
	const onClick = (role: UserRole) => {
		startTransition(() => {
			changeRole({ role: role, id: userId })
				.then((data) => {
					if (data?.error) toast.error(data?.error);
					if (data?.success) {
						toast.success(data?.success);
						router.refresh();
					}
				})
				.catch(() => toast.error(ACTION_DEFAULT_ERROR));
		});
	};
	return (
		<DropdownMenuRadioGroup value={userRole}>
			{roles.map((role) => (
				<DropdownMenuRadioItem
					key={role}
					disabled={userRole === role || isPending}
					onClick={() => onClick(role)}
					value={role}>
					<UserRoleBadge
						role={role}
						variant='outline'
					/>
				</DropdownMenuRadioItem>
			))}
		</DropdownMenuRadioGroup>
	);
};

export default ChangeRoleDropdown;
