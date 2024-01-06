import type { Metadata, Viewport } from 'next';

import { Fanwood_Text, Orbitron, Rajdhani } from 'next/font/google';

import Header from '@/components/general/Header';
import ThemeProvider from '@/components/providers/ThemeProvider';

import './globals.css';

const rajdhani = Rajdhani({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-rajdhani',
});
const orbitron = Orbitron({
	subsets: ['latin'],
	variable: '--font-orbitron',
});
const fanwoodText = Fanwood_Text({ weight: ['400'], subsets: ['latin'], variable: '--font-fanwood-text' });

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
			className={`${rajdhani.variable} ${orbitron.variable} ${fanwoodText.variable}`}
			suppressHydrationWarning>
			<body className='min-w-[400px] transition-colors duration-500'>
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
