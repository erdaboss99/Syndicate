import { Badge } from '@/components/ui/Badge';
import { UserRole } from '@prisma/client';
import { LuBriefcase, LuShield, LuUser } from 'react-icons/lu';

type UserRoleBadgeProps = {
	role: UserRole;
};

const UserRoleBadge = ({ role }: UserRoleBadgeProps) => {
	return (
		<Badge variant='outline'>
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
