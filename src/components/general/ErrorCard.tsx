import CardWrapper, { type CardWrapperProps } from '@/components/general/CardWrapper';
import LinkButton, { type LinkButtonProps } from '@/components/general/LinkButton';
import { CardContent, CardFooter } from '@/components/ui/Card';
import { LuAlertTriangle } from 'react-icons/lu';

type ErrorCardProps = {
	headerTitle: string;
	headerLabel?: string;
	message?: string;
} & LinkButtonProps &
	Omit<CardWrapperProps, 'children' | 'size' | 'navigationTree'>;

const ErrorCard = ({
	headerTitle,
	headerLabel,
	message,
	buttonLabel,
	buttonHref,
	buttonVariant,
	buttonSize,
}: ErrorCardProps) => {
	return (
		<CardWrapper
			navigationTree={null}
			size='md'
			headerTitle={headerTitle}
			headerLabel={headerLabel}>
			<CardContent>
				<div className='flex items-center gap-x-4 rounded-md bg-destructive/15 p-3 text-xl font-bold text-destructive'>
					<LuAlertTriangle className='h-10 w-10' />
					<p>{message || 'Something went wrong! Please try again later.'}</p>
				</div>
			</CardContent>
			<CardFooter className='flex items-center justify-center'>
				<LinkButton
					buttonLabel={buttonLabel}
					buttonHref={buttonHref}
					buttonVariant={buttonVariant}
					buttonSize={buttonSize}
				/>
			</CardFooter>
		</CardWrapper>
	);
};

export default ErrorCard;
