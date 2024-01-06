import Link from 'next/link';

import LoginButton from '@/components/auth/LoginButton';
import Logo from '@/components/general/Logo';
import ThemeToggle from '@/components/general/ThemeToggle';
import { Button } from '@/components/ui/Button';

const Header = () => {
	return (
		<header className='relative inset-x-0 top-0 z-[10] h-fit w-full p-3'>
			<nav className='mx-auto flex h-full max-w-7xl flex-col items-center justify-between gap-5 px-8 lg:flex-row lg:gap-2'>
				<Link href='/'>
					<Logo />
				</Link>
				<div className='flex items-center justify-center space-x-2'>
					<LoginButton>
						<Button
							variant='default'
							size='lg'>
							Sign in
						</Button>
					</LoginButton>
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
};

export default Header;
