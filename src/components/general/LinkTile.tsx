import Link from 'next/link';

import { Card } from '@/components/ui/Card';

export type LinkTileProps = {
	tileHref: string;
	children: React.ReactNode;
};

const LinkTile = ({ tileHref, children }: LinkTileProps) => {
	return (
		<Link
			className='h-full w-full'
			href={tileHref}>
			<Card
				variant='tile'
				className='bg-background md:bg-card'>
				{children}
			</Card>
		</Link>
	);
};

export default LinkTile;
