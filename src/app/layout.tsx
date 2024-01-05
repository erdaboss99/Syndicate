import type { Metadata, Viewport } from 'next';

import { Rajdhani } from 'next/font/google';

import Header from '@/components/general/Header';
import ThemeProvider from '@/components/providers/ThemeProvider';

import { cn } from '@/lib/utils';

import './globals.css';

const rajdhani = Rajdhani({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Syndicate',
	description: 'Syndicate - A Corporate Management System',
};

export const viewport: Viewport = {
	width: 'device-width',
	height: 'device-height',
	initialScale: 1.0,
	maximumScale: 1.0,
	minimumScale: 1.0,
	userScalable: false,
	viewportFit: 'cover',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html
			lang='en'
			suppressHydrationWarning>
			<body className={cn(rajdhani.className, 'transition-colors duration-500')}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					storageKey='prefered-color-scheme'
					enableSystem>
					<Header />
					<div>{children}</div>
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
