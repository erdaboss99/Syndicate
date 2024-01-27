import Link from 'next/link';

type LoginButtonProps = {
	children: React.ReactNode;
};

const LoginButton = ({ children }: LoginButtonProps) => {
	return <Link href='/auth/login'>{children}</Link>;
};

export default LoginButton;
