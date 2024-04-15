import RequestPasswordResetForm from '@/components/auth/RequestPasswordResetForm';
import { AuthWrapper } from '@/components/general/CardWrapper';

const RequestPasswordResetPage = () => {
	return (
		<AuthWrapper
			navigationTree={null}
			headerTitle='Request new password'
			linkLabel='Back to login'
			linkHref='/auth/login'>
			<RequestPasswordResetForm />
		</AuthWrapper>
	);
};

export default RequestPasswordResetPage;
