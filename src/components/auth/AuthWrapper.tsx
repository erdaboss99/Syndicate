import SocialLogins from '@/components/auth/SocialLogins';
import BackButton, { type BackButtonProps } from '@/components/general/BackButton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/Card';

type AuthWrapperProps = {
	children: React.ReactNode;
	headerTitle: string;
	headerLabel?: string;
	showSocialLogins?: boolean;
} & BackButtonProps;

const AuthWrapper = ({
	children,
	headerTitle,
	backButtonLabel,
	backButtonHref,
	backButtonVariant,
	backButtonSize,
	headerLabel,
	showSocialLogins,
}: AuthWrapperProps) => {
	return (
		<Card className='w-full md:w-[800px]'>
			<CardHeader className='text-center font-orbitron text-4xl md:text-5xl'>{headerTitle}</CardHeader>
			{headerLabel && (
				<CardDescription className='text-center font-orbitron text-xl md:text-2xl'>
					{headerLabel}
				</CardDescription>
			)}
			<CardContent>{children}</CardContent>
			{showSocialLogins && (
				<CardFooter>
					<SocialLogins />
				</CardFooter>
			)}
			{backButtonLabel && backButtonHref && (
				<CardFooter className='flex items-center justify-center'>
					<BackButton
						backButtonLabel={backButtonLabel}
						backButtonHref={backButtonHref}
						backButtonVariant={backButtonVariant}
						backButtonSize={backButtonSize}
					/>
				</CardFooter>
			)}
		</Card>
	);
};

export default AuthWrapper;
