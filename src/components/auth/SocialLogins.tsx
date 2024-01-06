'use client';

import { Facebook, Github } from 'lucide-react';

import { Button } from '@/components/ui/Button';

const SocialLogins = () => {
	return (
		<div className='flex w-full items-center justify-center gap-x-4'>
			<Button
				size='lg'
				className='w-[50%]'
				variant='outline'
				onClick={() => {}}>
				<Github />
			</Button>

			<Button
				size='lg'
				className='w-[50%]'
				variant='outline'
				onClick={() => {}}>
				<Facebook />
			</Button>
		</div>
	);
};

export default SocialLogins;
