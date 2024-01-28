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
	Omit<CardWrapperProps, 'children'>;

const AuthWrapper = ({
	children,
	headerTitle,
	buttonLabel,
	buttonHref,
	buttonVariant,
	buttonSize,
	headerLabel,
	showSocialLogins,
}: AuthWrapperProps) => {
	return (
		<CardWrapper
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
					buttonLabel={buttonLabel}
					buttonHref={buttonHref}
					buttonVariant={buttonVariant}
					buttonSize={buttonSize}
				/>
			</CardFooter>
		</CardWrapper>
	);
};

export default AuthWrapper;
