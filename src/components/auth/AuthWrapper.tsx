import SocialLogins from '@/components/auth/SocialLogins';
import CardWrapper, { type CardWrapperProps } from '@/components/general/CardWrapper';
import LinkButton, { type LinkButtonProps } from '@/components/general/LinkButton';
import { CardContent, CardFooter } from '@/components/ui/Card';

export type AuthWrapperProps = {
	children: React.ReactNode;
	headerTitle: string;
	headerLabel?: string;
	showSocialLogins?: boolean;
} & LinkButtonProps &
	Omit<CardWrapperProps, 'children' | 'size'>;

const AuthWrapper = ({
	navigationTree,
	children,
	headerTitle,
	linkLabel,
	linkHref,
	linkVariant,
	linkSize,
	headerLabel,
	showSocialLogins,
}: AuthWrapperProps) => {
	return (
		<CardWrapper
			navigationTree={navigationTree}
			size='MD'
			headerTitle={headerTitle}
			headerLabel={headerLabel}>
			<CardContent>{children}</CardContent>
			{showSocialLogins && (
				<CardFooter>
					<SocialLogins />
				</CardFooter>
			)}
			<CardFooter className='flex items-center justify-center'>
				<LinkButton
					linkLabel={linkLabel}
					linkHref={linkHref}
					linkVariant={linkVariant}
					linkSize={linkSize}
				/>
			</CardFooter>
		</CardWrapper>
	);
};

export default AuthWrapper;
