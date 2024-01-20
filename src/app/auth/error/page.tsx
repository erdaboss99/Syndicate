import ErrorCard from '@/components/general/ErrorCard';

const AuthErrorPage = () => {
	return (
		<ErrorCard
			headerTitle='Something went wrong!'
			backButtonLabel='Back to login'
			backButtonHref='/auth/login'
			backButtonVariant='default'
			backButtonSize='lg'
		/>
	);
};

export default AuthErrorPage;
