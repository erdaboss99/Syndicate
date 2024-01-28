import ErrorCard from '@/components/auth/ErrorCard';

type AuthErrorPageProps = {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
};
const AuthErrorPage = ({ searchParams }: AuthErrorPageProps) => {
	const error = searchParams.error as string;
	return (
		<ErrorCard
			headerTitle='Authentication error!'
			message={error}
			buttonLabel='Back to login'
			buttonHref='/auth/login'
			buttonVariant='default'
			buttonSize='lg'
		/>
	);
};

export default AuthErrorPage;
