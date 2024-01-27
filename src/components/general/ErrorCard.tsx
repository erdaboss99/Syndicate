import { type BackButtonProps } from '@/components/general/BackButton';
import CardWrapper from '@/components/general/CardWrapper';
import { LuAlertTriangle } from 'react-icons/lu';

type ErrorCardProps = {
	headerTitle: string;
	message?: string;
} & BackButtonProps;

const ErrorCard = ({
	headerTitle,
	message,
	backButtonLabel,
	backButtonHref,
	backButtonVariant,
	backButtonSize,
}: ErrorCardProps) => {
	return (
		<CardWrapper
			headerTitle={headerTitle}
			backButtonLabel={backButtonLabel}
			backButtonHref={backButtonHref}
			backButtonVariant={backButtonVariant}
			backButtonSize={backButtonSize}>
			<div className='flex items-center gap-x-4 rounded-md bg-destructive/15 p-3 text-xl font-bold text-destructive'>
				<LuAlertTriangle className='h-10 w-10' />
				<p>{message || 'Something went wrong! Please try again later.'}</p>
			</div>
		</CardWrapper>
	);
};

export default ErrorCard;
