import Link from 'next/link';

import { getCurrentUser } from '@/lib/auth';

import LoginButton from '@/components/auth/LoginButton';
import Logo from '@/components/navbar/Logo';
import ThemeToggle from '@/components/navbar/ThemeToggle';
import UserButton from '@/components/navbar/UserButton';
import { Button } from '@/components/ui/Button';
import { CgDarkMode } from 'react-icons/cg';

const Header = async () => {
	const user = await getCurrentUser();

	return (
		<header className='relative inset-x-0 top-0 z-[10] h-fit w-full border-b p-3'>
			<nav className='mx-auto flex h-full max-w-7xl flex-col items-center justify-between gap-5 px-8 md:flex-row md:gap-2'>
				<Button
					variant='logo'
					size='nav'
					asChild>
					<Link href='/'>
						<Logo />
					</Link>
				</Button>
				<div className='flex flex-row items-center justify-center space-x-2'>
					{!user && (
						<LoginButton>
							<Button
								variant='outline'
								size='nav'>
								Sign in
							</Button>
						</LoginButton>
					)}
					{user && <UserButton />}
					<ThemeToggle>
						<Button
							variant='ghost'
							size='nav'>
							<CgDarkMode className='h-9 w-9' />
						</Button>
					</ThemeToggle>
				</div>
			</nav>
		</header>
	);
};

export default Header;
