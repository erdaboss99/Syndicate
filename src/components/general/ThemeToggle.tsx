'use client';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/Button';
import { CgDarkMode } from 'react-icons/cg';

const ThemeToggle = () => {
	const { setTheme, resolvedTheme } = useTheme();

	const onClick = () => setTheme(resolvedTheme === 'light' ? 'dark' : 'light');

	return (
		<Button
			variant='outline'
			size='nav'
			onClick={onClick}>
			<CgDarkMode className='h-8 w-8' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
};
export default ThemeToggle;
