import { TokenVerificationSchema } from '@/schemas';

import AuthWrapper from '@/components/auth/AuthWrapper';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import ErrorCard from '@/components/general/ErrorCard';

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
			navigationTree={null}
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
