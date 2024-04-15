import RegistrationForm from '@/components/auth/RegistrationForm';
import { AuthWrapper } from '@/components/general/CardWrapper';

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
