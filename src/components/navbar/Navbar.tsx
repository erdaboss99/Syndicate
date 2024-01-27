import Link from 'next/link';

import { getCurrentUser } from '@/lib/auth';

import Logo from '@/components/navbar/Logo';
import ThemeToggle from '@/components/navbar/ThemeToggle';
import UserButton from '@/components/navbar/UserButton';
import { Button } from '@/components/ui/Button';
import { CgDarkMode } from 'react-icons/cg';

const Navbar = async () => {
	const user = await getCurrentUser();

	return (
		<header className='relative z-30 h-16 w-full'>
			<div className='fixed top-0 h-16 w-full border-b bg-background'>
				<nav className='inset-x-0 mx-auto flex h-full w-full max-w-7xl flex-row items-center justify-between p-3 md:px-7'>
					<Link href='/'>
						<Button
							variant='logo'
							size='nav'>
							<Logo />
						</Button>
					</Link>
					{user && <UserButton />}
					{!user && (
						<ThemeToggle>
							<Button
								variant='ghost'
								size='nav'>
								<CgDarkMode className='h-9 w-9' />
							</Button>
						</ThemeToggle>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
