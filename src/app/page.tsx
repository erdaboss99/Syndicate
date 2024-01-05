import Logo from '@/components/general/Logo';

const Home = async () => {
	return (
		<main className='flex h-full flex-col items-center justify-center text-center'>
			<div className='space-y-6'>
				<Logo size='lg' />
			</div>
		</main>
	);
};

export default Home;
