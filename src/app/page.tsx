import { auth } from '@/auth';

import Banner from '@/components/general/Banner';

const HomePage = async () => {
	const session = await auth();
	return (
		<div className='flex flex-col items-center justify-center'>
			<Banner />
			{JSON.stringify(session)}
		</div>
	);
};

export default HomePage;
