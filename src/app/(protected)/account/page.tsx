import { getCurrentUser } from '@/lib/auth';

const AccountPage = async () => {
	const user = await getCurrentUser();

	return (
		<div>
			<h1>Account Page</h1>
			<h2>{JSON.stringify(user)}</h2>
		</div>
	);
};

export default AccountPage;
