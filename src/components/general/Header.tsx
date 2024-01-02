import Logo from '@/components/general/Logo';
import ThemeToggle from '@/components/general/ThemeToggle';

const Header = () => {
	return (
		<header className='relative inset-x-0 top-0 z-[10] h-fit w-full p-3'>
			<nav className='mx-auto flex h-full max-w-7xl flex-col items-center justify-between gap-5 px-8 lg:flex-row lg:gap-2'>
				<Logo />
				<ThemeToggle />
			</nav>
		</header>
	);
};

export default Header;
