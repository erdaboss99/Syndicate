'use client';

import { useCurrentUser } from '@/hooks/useCurrentUser';

const DashboardPage = () => {
	const user = useCurrentUser();

	return (
		<div>
			<h1>Dashboard Page</h1>
			<h1>{JSON.stringify(user)}</h1>
		</div>
	);
};

export default DashboardPage;
