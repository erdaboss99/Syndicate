'use client';

import { useTheme } from 'next-themes';

type ThemeToggleProps = {
	children: React.ReactNode;
};

const ThemeToggle = ({ children }: ThemeToggleProps) => {
	const { setTheme, resolvedTheme } = useTheme();

	const onClick = () => setTheme(resolvedTheme === 'light' ? 'dark' : 'light');

	return (
		<span
			className='flex items-center justify-center'
			onClick={onClick}>
			{children}
		</span>
	);
};
export default ThemeToggle;
