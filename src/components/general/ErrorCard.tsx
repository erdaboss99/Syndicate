import { LuAlertTriangle } from 'react-icons/lu';

import { CardWrapper, type CardWrapperProps } from '@/components/general/CardWrapper';
import { CardContent } from '@/components/ui/Card';

type ErrorCardProps = {
	message?: string;
} & Omit<CardWrapperProps, 'children' | 'size' | 'navigationTree'>;

const ErrorCard = ({
	headerTitle,
	headerLabel,
	message,
	linkLabel,
	linkHref,
	linkVariant,
	linkSize,
}: ErrorCardProps) => {
	return (
		<CardWrapper
			navigationTree={null}
			size='MD'
			headerTitle={headerTitle}
			headerLabel={headerLabel}
			linkLabel={linkLabel}
			linkHref={linkHref}
			linkVariant={linkVariant}
			linkSize={linkSize}>
			<CardContent>
				<div className='flex items-center gap-x-4 rounded-md bg-destructive/15 p-3 text-xl font-bold text-destructive'>
					<LuAlertTriangle className='h-10 w-10' />
					<p>{message || 'Something went wrong! Please try again later.'}</p>
				</div>
			</CardContent>
		</CardWrapper>
	);
};

export default ErrorCard;
