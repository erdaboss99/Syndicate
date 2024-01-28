import AuthWrapper, { type AuthWrapperProps } from '@/components/auth/AuthWrapper';
import { LuAlertTriangle } from 'react-icons/lu';

type ErrorCardProps = {
	message?: string;
} & Omit<AuthWrapperProps, 'children'>;

const ErrorCard = ({ headerTitle, message, buttonLabel, buttonHref, buttonVariant, buttonSize }: ErrorCardProps) => {
	return (
		<AuthWrapper
			headerTitle={headerTitle}
			buttonLabel={buttonLabel}
			buttonHref={buttonHref}
			buttonVariant={buttonVariant}
			buttonSize={buttonSize}>
			<div className='flex items-center gap-x-4 rounded-md bg-destructive/15 p-3 text-xl font-bold text-destructive'>
				<LuAlertTriangle className='h-10 w-10' />
				<p>{message || 'Something went wrong! Please try again later.'}</p>
			</div>
		</AuthWrapper>
	);
};

export default ErrorCard;
