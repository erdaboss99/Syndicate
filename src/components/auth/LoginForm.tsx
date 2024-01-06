import CardWrapper from '@/components/general/CardWrapper';

const LoginForm = () => {
	return (
		<CardWrapper
			headerTitle='Login'
			headerLabel='Welcome back!'
			backButtonLabel="Don't have an account?"
			backButtonHref='/auth/register'
			showSocial>
			<div className=' mt-4 flex items-center justify-center text-lg'>LoginForm component</div>
		</CardWrapper>
	);
};

export default LoginForm;
