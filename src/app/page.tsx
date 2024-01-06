import LoginButton from '@/components/auth/LoginButton';
import Logo from '@/components/general/Logo';
import { Button } from '@/components/ui/button';

const Home = async () => {
	return (
		<main className='flex h-full flex-col items-center justify-center gap-8 text-center'>
			<Logo size='lg' />
			<LoginButton>
				<Button
					variant='default'
					size='lg'>
					Sign in
				</Button>
			</LoginButton>
		</main>
	);
};

export default Home;
