import CardWrapper, { type CardWrapperProps } from '@/components/general/CardWrapper';
import LinkButton, { LinkButtonProps } from '@/components/general/LinkButton';
import { CardContent, CardFooter } from '@/components/ui/Card';

type AppointmentWrapperProps = {
	children: React.ReactNode;
} & Partial<LinkButtonProps> &
	Omit<CardWrapperProps, 'children'>;

const AppointmentWrapper = ({
	navigationTree,
	children,
	headerTitle,
	headerLabel,
	linkLabel,
	linkHref,
	linkVariant,
	linkSize,
	size,
}: AppointmentWrapperProps) => {
	return (
		<CardWrapper
			navigationTree={navigationTree}
			size={size}
			headerTitle={headerTitle}
			headerLabel={headerLabel}>
			<CardContent>{children}</CardContent>
			{linkLabel && linkHref && (
				<CardFooter className='flex items-center justify-center'>
					<LinkButton
						linkLabel={linkLabel}
						linkHref={linkHref}
						linkVariant={linkVariant}
						linkSize={linkSize}
					/>
				</CardFooter>
			)}
		</CardWrapper>
	);
};

export default AppointmentWrapper;
