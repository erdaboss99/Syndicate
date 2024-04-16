import { getCurrentUser } from '@/lib/auth';

import { AdminDashboard, EmployeeDashboard, UserDashboard } from '@/components/dashboard/DashboardVariants';

const AdminDashboardPage = async () => {
	const currentUser = await getCurrentUser();

	switch (currentUser?.role) {
		case 'ADMIN':
			return <AdminDashboard />;
		case 'EMPLOYEE':
			return <EmployeeDashboard />;
		default:
			return <UserDashboard />;
	}
};

export default AdminDashboardPage;
