import { TokenVerificationSchema } from '@/schemas';

import AuthWrapper from '@/components/auth/AuthWrapper';
import EmailVerificationForm from '@/components/auth/EmailVerificationForm';
import ErrorCard from '@/components/general/ErrorCard';

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
				linkLabel='Back to login'
				linkHref='/auth/login'
			/>
		);

	return (
		<AuthWrapper
			navigationTree={null}
			headerTitle='Confirming your email'
			linkLabel='Back to login'
			linkHref='/auth/login'>
			<EmailVerificationForm token={validatedData.data.token} />
		</AuthWrapper>
	);
};

export default EmailVerificationPage;
