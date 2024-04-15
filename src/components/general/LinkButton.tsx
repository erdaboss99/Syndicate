import Link from 'next/link';

import { Button, ButtonProps } from '@/components/ui/Button';

export type LinkButtonProps = {
	linkLabel: string;
	linkHref: string;
	linkVariant?: ButtonProps['variant'];
	linkSize?: ButtonProps['size'];
};

const LinkButton = ({ linkLabel, linkHref, linkVariant, linkSize }: LinkButtonProps) => {
	return (
		<Button
			variant={linkVariant || 'link'}
			size={linkSize || 'full'}>
			<Link href={linkHref}>{linkLabel}</Link>
		</Button>
	);
};

export default LinkButton;
