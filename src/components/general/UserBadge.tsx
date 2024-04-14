import { UserRole } from '@prisma/client';
import { LuBriefcase, LuShield, LuUser } from 'react-icons/lu';

import { Badge, BadgeProps } from '@/components/ui/Badge';

type UserRoleBadgeProps = {
	role: UserRole;
	badgeVariant: BadgeProps['variant'];
};

const UserRoleBadge = ({ role, badgeVariant }: UserRoleBadgeProps) => {
	return (
		<Badge variant={badgeVariant}>
			{role === UserRole.ADMIN ? <AdminBadge /> : role === UserRole.EMPLOYEE ? <EmployeeBadge /> : <UserBadge />}
		</Badge>
	);
};

const AdminBadge = () => {
	return (
		<>
			<LuShield
				className='mr-2'
				size={16}
			/>
			Admin
		</>
	);
};

const EmployeeBadge = () => {
	return (
		<>
			<LuBriefcase
				className='mr-2'
				size={16}
			/>
			Employee
		</>
	);
};

const UserBadge = () => {
	return (
		<>
			<LuUser
				className='mr-2'
				size={16}
			/>
			User
		</>
	);
};

export default UserRoleBadge;
