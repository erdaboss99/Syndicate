import { Fanwood_Text } from 'next/font/google';

import { cn } from '@/lib/utils';

const fanwoodText = Fanwood_Text({ weight: ['400'], subsets: ['latin'] });

type LogoProps = {
	size: 'sm' | 'lg';
};

const Logo = ({ size }: LogoProps) => {
	return (
		<div
			className={cn(
				size === 'lg' ? 'p-3 pt-5' : 'p-1 pt-3',
				'flex h-fit w-fit cursor-default select-none flex-col items-center justify-center divide-y-2 rounded-lg border border-input bg-card text-card-foreground shadow transition-colors duration-500 hover:bg-primary/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
			)}>
			<h1
				className={cn(
					fanwoodText.className,
					size === 'lg' ? 'py-4 text-5xl' : 'text-lg',
					'ml-[0.7em] uppercase tracking-[0.7em]',
				)}>
				syndicate
			</h1>
			{size === 'lg' && <p className='py-4 text-2xl'>A corporate management system</p>}
		</div>
	);
};
export default Logo;
