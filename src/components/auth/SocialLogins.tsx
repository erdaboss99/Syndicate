'use client';

import { signIn } from 'next-auth/react';
import { GrGoogle } from 'react-icons/gr';
import { LuGithub } from 'react-icons/lu';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { Button } from '@/components/ui/Button';

const SocialLogins = () => {
	const onClick = (provider: 'google' | 'github') => {
		signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
	};

	return (
		<div className='flex w-full flex-col items-center justify-center gap-4 md:flex-row'>
			<Button
				size='lg'
				className='w-full gap-4 md:w-[50%]'
				variant='outline'
				onClick={() => onClick('github')}>
				<LuGithub className='h-6 w-6' />
				<span>Sign in with Github</span>
			</Button>

			<Button
				size='lg'
				className='w-full gap-4 md:w-[50%]'
				variant='outline'
				onClick={() => onClick('google')}>
				<GrGoogle className='h-6 w-6' />
				<span>Sign in with Google</span>
			</Button>
		</div>
	);
};

export default SocialLogins;
