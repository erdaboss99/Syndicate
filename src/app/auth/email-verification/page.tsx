import { TokenVerificationSchema } from '@/schemas';

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
				backButtonLabel='Back to login'
				backButtonHref='/auth/login'
				backButtonVariant='default'
				backButtonSize='lg'
			/>
		);

	return <EmailVerificationForm token={validatedData.data.token} />;
};

export default EmailVerificationPage;
