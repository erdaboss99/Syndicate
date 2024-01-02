import type { Metadata, Viewport } from 'next';

import { Fanwood_Text, Rajdhani } from 'next/font/google';

import Header from '@/components/general/Header';
import ThemeProvider from '@/components/providers/ThemeProvider';

import './globals.css';

const rajdhani = Rajdhani({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-rajdhani',
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
			className={`${rajdhani.variable} ${fanwoodText.variable}`}
			suppressHydrationWarning>
			<body className='font-rajdhani'>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem>
					<Header />
					<div>{children}</div>
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
