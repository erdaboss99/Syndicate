import { TokenVerificationSchema } from '@/schemas';

import AuthWrapper from '@/components/auth/AuthWrapper';
import ErrorCard from '@/components/auth/ErrorCard';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

type ResetPasswordPageProps = {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

const ResetPasswordPage = ({ searchParams }: ResetPasswordPageProps) => {
	const validatedData = TokenVerificationSchema.safeParse(searchParams);
	if (!validatedData.success)
		return (
			<ErrorCard
				headerTitle='Authentication error!'
				message='Invalid token!'
				buttonLabel='Back to login'
				buttonHref='/auth/login'
				buttonVariant='default'
				buttonSize='lg'
			/>
		);

	return (
		<AuthWrapper
			headerTitle='Enter a new password'
			buttonLabel='Back to login'
			buttonHref='/auth/login'
			buttonVariant='link'
			buttonSize='lg'>
			<ResetPasswordForm token={validatedData.data.token} />
		</AuthWrapper>
	);
};

export default ResetPasswordPage;
