import { TokenVerificationSchema } from '@/schemas';

import AuthWrapper from '@/components/auth/AuthWrapper';
import EmailVerificationForm from '@/components/auth/EmailVerificationForm';
import ErrorCard from '@/components/auth/ErrorCard';

type EmailVerificationPageProps = {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

const EmailVerificationPage = ({ searchParams }: EmailVerificationPageProps) => {
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
			headerTitle='Confirming your email'
			buttonLabel='Back to login'
			buttonHref='/auth/login'
			buttonVariant='link'
			buttonSize='lg'>
			<EmailVerificationForm token={validatedData.data.token} />
		</AuthWrapper>
	);
};

export default EmailVerificationPage;
