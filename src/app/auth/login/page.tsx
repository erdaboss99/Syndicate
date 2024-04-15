import AuthWrapper from '@/components/auth/AuthWrapper';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
	return (
		<AuthWrapper
			navigationTree={null}
			headerTitle='Login'
			headerLabel='Welcome back!'
			linkLabel="Don't have an account?"
			linkHref='/auth/registration'
			showSocialLogins>
			<LoginForm />
		</AuthWrapper>
	);
};

export default LoginPage;
