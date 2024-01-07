import Link from 'next/link';

import { Button } from '@/components/ui/Button';

const NotFoundPage = () => {
	return (
		<main className='mt-[10vh] flex flex-col items-center justify-center space-y-6 text-center md:flex-row md:space-x-6 md:text-left'>
			<h1 className='md:leading-14 border-b-2 py-5 text-6xl font-bold leading-9 tracking-tight md:border-b-0 md:border-r-2 md:px-6 md:text-8xl'>
				404
			</h1>
			<div>
				<p className='mb-4 max-w-md text-center text-xl font-semibold leading-normal md:text-left md:text-2xl'>
					Unfortunately, this page does not exist.
				</p>
				<Link href='/'>
					<Button size='lg'>Back to homepage</Button>
				</Link>
			</div>
		</main>
	);
};

export default NotFoundPage;
