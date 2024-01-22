'use client';

import SocialLogins from '@/components/auth/SocialLogins';
import BackButton, { type BackButtonProps } from '@/components/general/BackButton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/Card';

type CardWrapperProps = {
	children: React.ReactNode;
	headerTitle: string;
	headerLabel?: string;
	showSocial?: boolean;
} & BackButtonProps;

const CardWrapper = ({
	children,
	headerTitle,
	backButtonLabel,
	backButtonHref,
	backButtonVariant,
	backButtonSize,
	headerLabel,
	showSocial,
}: CardWrapperProps) => {
	return (
		<Card className='w-full  md:w-[800px]'>
			<CardHeader className='text-center font-orbitron text-5xl'>{headerTitle}</CardHeader>
			{headerLabel && (
				<CardDescription className='text-center font-orbitron text-2xl'>{headerLabel}</CardDescription>
			)}
			<CardContent>{children}</CardContent>
			{showSocial && (
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

export default CardWrapper;
