'use client';

import { Orbitron } from 'next/font/google';

import { cn } from '@/lib/utils';

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

const orbitron = Orbitron({
	subsets: ['latin'],
});

const CardWrapper = ({
	children,
	headerTitle,
	headerLabel,
	backButtonLabel,
	backButtonHref,
	showSocial,
}: CardWrapperProps) => {
	return (
		<Card className='w-[600px] shadow-md'>
			<CardHeader className={cn(orbitron.className, 'text-center text-5xl')}>{headerTitle}</CardHeader>
			<CardDescription className={cn(orbitron.className, 'text-center text-2xl')}>{headerLabel}</CardDescription>
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
