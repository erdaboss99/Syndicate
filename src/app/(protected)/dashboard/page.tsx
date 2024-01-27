'use client';

import { useCurrentUser } from '@/hooks/useCurrentUser';

const DashboardPage = () => {
	const user = useCurrentUser();

	return (
		<div>
			<h1>Dashboard Page</h1>
			<h2>{JSON.stringify(user)}</h2>
		</div>
	);
};

export default DashboardPage;
