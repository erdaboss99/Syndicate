import type { Metadata, Viewport } from 'next';
import { Fanwood_Text, Orbitron, Rajdhani } from 'next/font/google';

import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

import '@/styles/globals.css';

import Navbar from '@/components/navbar/Navbar';
import ThemeProvider from '@/components/providers/ThemeProvider';

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

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<html
				lang='en'
				className={`${rajdhani.variable} ${orbitron.variable} ${fanwoodText.variable}`}
				suppressHydrationWarning>
				<body className='min-w-[350px] select-none'>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						storageKey='prefered-color-scheme'
						enableSystem>
						<Navbar />
						<main className='mx-auto flex w-full max-w-7xl items-start justify-center py-4 md:py-16'>
							{children}
						</main>
					</ThemeProvider>
				</body>
			</html>
		</SessionProvider>
	);
};

export default RootLayout;
