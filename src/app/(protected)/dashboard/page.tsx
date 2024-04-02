import { getCurrentUser } from '@/lib/auth';

import AdminDashboard from '@/components/dashboard/AdminDashboard';
import EmployeeDashboard from '@/components/dashboard/EmployeeDashboard';
import UserDashboard from '@/components/dashboard/UserDashboard';

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
