import { TokenVerificationSchema } from '@/schemas';

import NewPasswordForm from '@/components/auth/NewPasswordForm';
import ErrorCard from '@/components/general/ErrorCard';

type NewPasswordPageProps = {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
};
const NewPasswordPage = ({ searchParams }: NewPasswordPageProps) => {
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

	return <NewPasswordForm token={validatedData.data.token} />;
};

export default NewPasswordPage;
