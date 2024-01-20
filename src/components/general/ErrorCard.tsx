import { type BackButtonProps } from '@/components/general/BackButton';
import CardWrapper from '@/components/general/CardWrapper';
import { LuAlertTriangle } from 'react-icons/lu';

type ErrorCardProps = {
	headerTitle: string;
} & BackButtonProps;

const ErrorCard = ({
	headerTitle,
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
			<span className='flex items-center justify-center text-destructive'>
				<LuAlertTriangle className='text-4xl' />
			</span>
		</CardWrapper>
	);
};

export default ErrorCard;
