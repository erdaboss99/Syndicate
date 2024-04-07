import CardWrapper, { type CardWrapperProps } from '@/components/general/CardWrapper';
import LinkButton, { LinkButtonProps } from '@/components/general/LinkButton';
import { CardContent, CardFooter } from '@/components/ui/Card';

type AppointmentWrapperProps = {
	children: React.ReactNode;
} & Partial<LinkButtonProps> &
	Omit<CardWrapperProps, 'children'>;

const AppointmentWrapper = ({
	children,
	headerTitle,
	headerLabel,
	buttonLabel,
	buttonHref,
	buttonVariant,
	buttonSize,
	size,
}: AppointmentWrapperProps) => {
	return (
		<CardWrapper
			size={size}
			headerTitle={headerTitle}
			headerLabel={headerLabel}>
			<CardContent className='mt-[3vh]'>{children}</CardContent>
			{buttonLabel && buttonHref && buttonVariant && buttonSize && (
				<CardFooter className='flex items-center justify-center'>
					<LinkButton
						buttonLabel={buttonLabel}
						buttonHref={buttonHref}
						buttonVariant={buttonVariant}
						buttonSize={buttonSize}
					/>
				</CardFooter>
			)}
		</CardWrapper>
	);
};

export default AppointmentWrapper;
