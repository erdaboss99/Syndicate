import CardWrapper, { type CardWrapperProps } from '@/components/general/CardWrapper';
import LinkButton, { type LinkButtonProps } from '@/components/general/LinkButton';
import { CardContent, CardFooter } from '@/components/ui/Card';

export type DashboardWrapperProps = {
	children: React.ReactNode;
} & Partial<LinkButtonProps> &
	Omit<CardWrapperProps, 'children'>;

const DashboardWrapper = ({
	navigationTree,
	children,
	headerTitle,
	headerLabel,
	size,
	linkLabel,
	linkHref,
	linkVariant,
	linkSize,
}: DashboardWrapperProps) => {
	return (
		<CardWrapper
			size={size}
			navigationTree={navigationTree}
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

export default DashboardWrapper;
