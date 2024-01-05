'use client';

import { useRouter } from 'next/navigation';

type LoginButtonProps = {
	children: React.ReactNode;
	behavior?: 'modal' | 'redirect';
	asChild?: boolean;
};

const LoginButton = ({ children, behavior = 'redirect', asChild }: LoginButtonProps) => {
	const router = useRouter();

	const onClick = () => {
		router.push('/auth/login');
	};

	if (behavior === 'modal') return <span className='todo'>TODO: Implement Modal</span>;

	return (
		<span
			onClick={onClick}
			className='cursor-pointer'>
			{children}
		</span>
	);
};

export default LoginButton;
