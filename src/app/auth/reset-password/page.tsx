import { TokenVerificationSchema } from '@/schemas';

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
				headerTitle='Invalid token!'
				backButtonLabel='Back to login'
				backButtonHref='/auth/login'
				backButtonVariant='default'
				backButtonSize='lg'
			/>
		);

	return <ResetPasswordForm token={validatedData.data.token} />;
};

export default ResetPasswordPage;
