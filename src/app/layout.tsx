import type { Metadata, Viewport } from 'next';

import { Rajdhani } from 'next/font/google';

import { ThemeProvider } from '../components/ThemeProvider';
import ThemeToggle from '../components/ThemeToggle';

import './globals.css';

const rajdhani = Rajdhani({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Syndicate',
	description: 'Syndicate - corporate management system',
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
			<body className={`${rajdhani.className} flex flex-col items-center justify-center`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem>
					<header>
						<ThemeToggle />
					</header>
					<div>{children}</div>
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
