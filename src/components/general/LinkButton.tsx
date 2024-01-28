import Link from 'next/link';

import { Button, ButtonProps } from '@/components/ui/Button';

export type LinkButtonProps = {
	buttonLabel: string;
	buttonHref: string;
	buttonVariant: ButtonProps['variant'];
	buttonSize: ButtonProps['size'];
};

const LinkButton = ({ buttonLabel, buttonHref, buttonVariant, buttonSize }: LinkButtonProps) => {
	return (
		<Button
			variant={buttonVariant}
			size={buttonSize}
			asChild>
			<Link href={buttonHref}>{buttonLabel}</Link>
		</Button>
	);
};

export default LinkButton;
