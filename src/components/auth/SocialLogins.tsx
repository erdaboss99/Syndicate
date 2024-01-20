'use client';

import { Facebook, Github } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { Button } from '@/components/ui/Button';

const SocialLogins = () => {
	const onClick = (provider: 'google' | 'github') => {
		signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
	};

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
				onClick={() => onClick('github')}>
			</Button>

			<Button
				size='lg'
				className='w-[50%]'
				variant='outline'
				onClick={() => {
					console.log('Facebook login');
				}}>
				<Facebook />
				onClick={() => onClick('google')}>
			</Button>
		</div>
	);
};

export default SocialLogins;
