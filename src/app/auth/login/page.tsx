import AuthWrapper from '@/components/auth/AuthWrapper';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
	return (
		<AuthWrapper
			headerTitle='Login'
			headerLabel='Welcome back!'
			buttonLabel="Don't have an account?"
			buttonHref='/auth/registration'
			buttonVariant='link'
			buttonSize='full'
			showSocialLogins>
			<LoginForm />
		</AuthWrapper>
	);
};

export default LoginPage;
