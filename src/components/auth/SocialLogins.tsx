'use client';

import { signIn } from 'next-auth/react';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { Button } from '@/components/ui/Button';
import { GrGoogle } from 'react-icons/gr';
import { LuGithub } from 'react-icons/lu';

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
				onClick={() => onClick('github')}>
				<LuGithub />
			</Button>

			<Button
				size='lg'
				className='w-[50%]'
				variant='outline'
				onClick={() => onClick('google')}>
				<GrGoogle />
			</Button>
		</div>
	);
};

export default SocialLogins;
