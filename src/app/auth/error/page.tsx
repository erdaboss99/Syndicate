import ErrorCard from '@/components/general/ErrorCard';

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
			backButtonLabel='Back to login'
			backButtonHref='/auth/login'
			backButtonVariant='default'
			backButtonSize='lg'
		/>
	);
};

export default AuthErrorPage;
