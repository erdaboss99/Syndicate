import type { Metadata, Viewport } from 'next';

import { Montserrat } from 'next/font/google';

import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

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
		<html lang='en'>
			<body className={montserrat.className}>{children}</body>
		</html>
	);
};

export default RootLayout;
