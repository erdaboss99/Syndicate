import AuthWrapper from '@/components/auth/AuthWrapper';
import RequestPasswordResetForm from '@/components/auth/RequestPasswordResetForm';

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
