'use client';

import { useEffect, useState } from 'react';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/Button';

const ThemeToggle = () => {
	const [mounted, setMounted] = useState(false);
	const { setTheme, resolvedTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<Button
			variant='outline'
			size='nav'
			onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}>
			{resolvedTheme === 'light' ? <Moon className='scale-150' /> : <Sun className='scale-150' />}
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
};
export default ThemeToggle;
