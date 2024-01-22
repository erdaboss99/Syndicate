import { auth } from '@/auth';

import Banner from '@/components/general/Banner';

const HomePage = async () => {
	const session = await auth();
	console.log(session);

	return <Banner />;
};

export default HomePage;
