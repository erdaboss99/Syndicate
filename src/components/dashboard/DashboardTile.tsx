import { type IconType } from 'react-icons/lib';

import LinkTile, { type LinkTileProps } from '@/components/general/LinkTile';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

type DashboardTileProps = {
	tileTitle: string;
	tilePrimaryCount: string;
	tilePrimaryText: string;
	tileSecondaryText: string;
	TileIcon: IconType;
} & Omit<LinkTileProps, 'children'>;

const DashboardTile = ({
	tileHref,
	tileTitle,
	tilePrimaryCount,
	tilePrimaryText,
	tileSecondaryText,
	TileIcon,
}: DashboardTileProps) => {
	return (
		<LinkTile tileHref={tileHref}>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-base md:text-lg'>{tileTitle}</CardTitle>
				<TileIcon className='h-6 w-6 text-muted-foreground' />
			</CardHeader>
			<CardContent className='p-3 md:p-6'>
				<h4 className='text-xl'>
					<span className='font-bold text-primary'>{tilePrimaryCount}</span>
					{tilePrimaryText}
				</h4>
				<p className='text-xs text-muted-foreground md:text-sm'>{tileSecondaryText}</p>
			</CardContent>
		</LinkTile>
	);
};

export default DashboardTile;
