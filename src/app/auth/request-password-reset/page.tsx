import AuthWrapper from '@/components/auth/AuthWrapper';
import RequestPasswordResetForm from '@/components/auth/RequestPasswordResetForm';

const RequestPasswordResetPage = () => {
	return (
		<AuthWrapper
			headerTitle='Request new password'
			buttonLabel='Back to login'
			buttonHref='/auth/login'
			buttonVariant='link'
			buttonSize='full'>
			<RequestPasswordResetForm />
		</AuthWrapper>
	);
};

export default RequestPasswordResetPage;
