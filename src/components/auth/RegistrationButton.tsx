import Link from 'next/link';

type RegistrationButtonProps = {
	children: React.ReactNode;
};

const RegistrationButton = ({ children }: RegistrationButtonProps) => {
	return <Link href='/auth/registration'>{children}</Link>;
};

export default RegistrationButton;
