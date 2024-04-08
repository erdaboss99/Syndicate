import CardWrapper, { type CardWrapperProps } from '@/components/general/CardWrapper';
import LinkButton, { type LinkButtonProps } from '@/components/general/LinkButton';
import { CardContent, CardFooter } from '@/components/ui/Card';

type DashboardWrapperProps = {
	children: React.ReactNode;
} & Partial<LinkButtonProps> &
	Omit<CardWrapperProps, 'children'>;

const DashboardWrapper = ({
	children,
	headerTitle,
	headerLabel,
	size,
	buttonLabel,
	buttonHref,
	buttonVariant,
	buttonSize,
}: DashboardWrapperProps) => {
	return (
		<CardWrapper
			size={size}
			headerTitle={headerTitle}
			headerLabel={headerLabel}>
			<CardContent>{children}</CardContent>
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

export default DashboardWrapper;
