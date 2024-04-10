import Link from 'next/link';

import { type IconType } from 'react-icons/lib';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

type DashboardTileProps = {
	tileHref: string;
	tileTitle: string;
	tilePrimaryCount: string;
	tilePrimaryText: string;
	tileSecondaryText: string;
	TileIcon: IconType;
};

const DashboardTile = ({
	tileHref,
	tileTitle,
	tilePrimaryCount,
	tilePrimaryText,
	tileSecondaryText,
	TileIcon,
}: DashboardTileProps) => {
	return (
		<Link
			className='h-full w-full'
			href={tileHref}>
			<Card variant='tile'>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-base md:text-lg'>{tileTitle}</CardTitle>
					<TileIcon className='h-6 w-6 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<h4 className='text-xl'>
						<span className='font-bold text-primary'>{tilePrimaryCount}</span>
						{tilePrimaryText}
					</h4>
					<p className='text-xs text-muted-foreground md:text-sm'>{tileSecondaryText}</p>
				</CardContent>
			</Card>
		</Link>
	);
};

export default DashboardTile;
