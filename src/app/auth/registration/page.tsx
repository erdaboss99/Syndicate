import AuthWrapper from '@/components/auth/AuthWrapper';
import RegistrationForm from '@/components/auth/RegistrationForm';

const RegistrationPage = () => {
	return (
		<AuthWrapper
			headerTitle='Registration'
			headerLabel='Create an account'
			buttonLabel='Already have an account?'
			buttonHref='/auth/login'
			buttonVariant='link'
			buttonSize='full'
			showSocialLogins>
			<RegistrationForm />
		</AuthWrapper>
	);
};

export default RegistrationPage;
