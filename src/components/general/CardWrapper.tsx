'use client';

import SocialLogins from '@/components/auth/SocialLogins';
import BackButton from '@/components/general/BackButton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/Card';

type CardWrapperProps = {
	children: React.ReactNode;
	headerTitle: string;
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial?: boolean;
};

const CardWrapper = ({
	children,
	headerTitle,
	headerLabel,
	backButtonLabel,
	backButtonHref,
	showSocial,
}: CardWrapperProps) => {
	return (
		<Card className='w-full shadow-md md:w-[600px]'>
			<CardHeader className='text-center font-orbitron text-5xl'>{headerTitle}</CardHeader>
			<CardDescription className='text-center font-orbitron text-2xl'>{headerLabel}</CardDescription>
			<CardContent>{children}</CardContent>
			{showSocial && (
				<CardFooter>
					<SocialLogins />
				</CardFooter>
			)}
			{backButtonLabel && backButtonHref && (
				<CardFooter>
					<BackButton
						label={backButtonLabel}
						href={backButtonHref}
					/>
				</CardFooter>
			)}
		</Card>
	);
};

export default CardWrapper;
