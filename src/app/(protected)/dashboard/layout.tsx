import { getCurrentUser } from '@/lib/auth';

type DashboardLayoutProps = {
	user: React.JSX.Element;
	employee: React.JSX.Element;
	admin: React.JSX.Element;
};

const DashboardLayout = async ({ user, employee, admin }: DashboardLayoutProps) => {
	const currentUser = await getCurrentUser();
	switch (currentUser?.role) {
		case 'ADMIN':
			return admin;
		case 'EMPLOYEE':
			return employee;
		default:
			return user;
	}
};

export default DashboardLayout;
