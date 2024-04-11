import { Heading, Link, Section, Text } from '@react-email/components';

import { PASSWORD_RESET_TOKEN_EXPIRY } from '@/constants';

import BaseEmailTemplate from '@/emails/BaseEmail';

type PasswordResetTemplateProps = {
	name: string;
	resetLink: string;
};

export const PasswordResetTemplate = ({ name, resetLink }: PasswordResetTemplateProps) => (
	<BaseEmailTemplate previewSuffix={'Password reset'}>
		<Heading className='mt-12 text-3xl font-bold'>Dear {name},</Heading>

		<Section className='mx-0 my-6'>
			<Text className='text-xl'>Please click on the link below to reset your password!</Text>

			<Link
				className='my-4 text-xl'
				href={resetLink}>
				Reset my password
			</Link>

			<Text className='text-xl'>{`This link will expire in ${PASSWORD_RESET_TOKEN_EXPIRY} minutes.`}</Text>
		</Section>

		<Text className='text-xl'>If you didn&apos;t request this, please ignore this email.</Text>
	</BaseEmailTemplate>
);

export default PasswordResetTemplate;
