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
				onClick={() => {
					console.log('Github login');
				}}>
				<Github />
			</Button>

			<Button
				size='lg'
				className='w-[50%]'
				variant='outline'
				onClick={() => {
					console.log('Facebook login');
				}}>
				<Facebook />
			</Button>
		</div>
	);
};

export default SocialLogins;
