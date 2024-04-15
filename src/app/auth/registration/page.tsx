import AuthWrapper from '@/components/auth/AuthWrapper';
import RegistrationForm from '@/components/auth/RegistrationForm';

const RegistrationPage = () => {
	return (
		<AuthWrapper
			navigationTree={null}
			headerTitle='Registration'
			headerLabel='Create an account'
			linkLabel='Already have an account?'
			linkHref='/auth/login'
			showSocialLogins>
			<RegistrationForm />
		</AuthWrapper>
	);
};

export default RegistrationPage;
