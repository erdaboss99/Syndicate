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
			linkLabel='Back to login'
			linkHref='/auth/login'
		/>
	);
};

export default AuthErrorPage;
