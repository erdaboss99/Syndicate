import { getCurrentUser } from '@/lib/auth';

import LoginButton from '@/components/auth/LoginButton';
import RegistrationButton from '@/components/auth/RegistrationButton';
import { Button } from '@/components/ui/Button';

const Banner = async () => {
	const user = await getCurrentUser();
	return (
		<div className='flex h-fit w-full flex-col items-center justify-center space-y-4 md:w-[800px]'>
			<div className='flex flex-col items-center justify-center divide-y-2'>
				<h1 className='ml-[0.7em] py-4 font-fanwood-text text-3xl uppercase tracking-[0.7em] md:text-5xl'>
					syndicate
				</h1>
				<p className='py-4 text-base md:text-2xl'>A corporate management system</p>
			</div>
			{!user && (
				<div className='flex items-center justify-center gap-8'>
					<Button
						variant='default'
						size='lg'>
						<LoginButton>Sign in</LoginButton>
					</Button>
					<Button
						variant='outline'
						size='lg'>
						<RegistrationButton>Sign up</RegistrationButton>
					</Button>
				</div>
			)}
		</div>
	);
};
export default Banner;
