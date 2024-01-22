import { TokenVerificationSchema } from '@/schemas';

import NewVerificationForm from '@/components/auth/NewVerificationForm';
import ErrorCard from '@/components/general/ErrorCard';

type NewVerificationPageProps = {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

const NewVerificationPage = ({ searchParams }: NewVerificationPageProps) => {
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

	return <NewVerificationForm token={validatedData.data.token} />;
};

export default NewVerificationPage;
