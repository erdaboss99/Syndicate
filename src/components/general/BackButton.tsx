'use client';

import Link from 'next/link';

import { Button, ButtonProps } from '@/components/ui/Button';

export type BackButtonProps = {
	backButtonLabel: string;
	backButtonHref: string;
	backButtonVariant: ButtonProps['variant'];
	backButtonSize: ButtonProps['size'];
};

const BackButton = ({ backButtonLabel, backButtonHref, backButtonVariant, backButtonSize }: BackButtonProps) => {
	return (
		<Button
			variant={backButtonVariant}
			size={backButtonSize}
			asChild>
			<Link href={backButtonHref}>{backButtonLabel}</Link>
		</Button>
	);
};

export default BackButton;
