'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

type BackButtonProps = {
	label: string;
	href: string;
};

const BackButton = ({ label, href }: BackButtonProps) => {
	return (
		<Button
			variant='link'
			className='w-full text-base'
			size='lg'
			asChild>
			<Link href={href}>{label}</Link>
		</Button>
	);
};

export default BackButton;
