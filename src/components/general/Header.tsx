import Logo from '@/components/general/Logo';
import ThemeToggle from '@/components/general/ThemeToggle';

const Header = () => {
	return (
		<header className='relative inset-x-0 top-0 w-full z-[10] h-fit p-3'>
			<nav className='flex items-center flex-col lg:flex-row gap-5 lg:gap-2 justify-between h-full px-8 mx-auto max-w-7xl'>
				<Logo />
				<ThemeToggle />
			</nav>
		</header>
	);
};

export default Header;
