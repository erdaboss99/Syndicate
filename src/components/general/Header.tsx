import Link from 'next/link';

import { getCurrentUser } from '@/lib/auth';

import LoginButton from '@/components/auth/LoginButton';
import Logo from '@/components/general/Logo';
import UserButton from '@/components/general/UserButton';
import { Button } from '@/components/ui/Button';

const Header = async () => {
	const user = await getCurrentUser();

	return (
		<header className='relative inset-x-0 top-0 z-[10] h-fit w-full border-b p-3'>
			<nav className='mx-auto flex h-full max-w-7xl flex-col items-center justify-between gap-5 px-8 md:flex-row md:gap-2'>
				<Button
					size='logo'
					variant='logo'
					asChild>
					<Link href='/'>
						<Logo />
					</Link>
				</Button>
				<div className='flex items-center justify-center space-x-2'>
					{!user && (
						<LoginButton>
							<Button
								variant='outline'
								size='logo'>
								Sign in
							</Button>
						</LoginButton>
					)}
					{user && <UserButton />}
				</div>
			</nav>
		</header>
	);
};

export default Header;
