import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth';

const AccountEditPage = async () => {
	const user = await getCurrentUser();
	if (user?.provider !== 'Credentials') redirect('/account');
	return <div>EditAccount</div>;
};

export default AccountEditPage;
