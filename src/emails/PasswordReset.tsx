import { PASSWORD_RESET_TOKEN_EXPIRY } from '@/constants';

import {
	Body,
	Container,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from '@react-email/components';

type PasswordResetTemplateProps = {
	name: string;
	resetLink: string;
};

export const PasswordResetTemplate = ({ name, resetLink }: PasswordResetTemplateProps) => (
	<Html style={base}>
		<Tailwind>
			<Preview>Syndicate - Password reset</Preview>
			<Body className='bg-slate-100'>
				<Container className='mx-auto my-0 px-7 pb-12 pt-5'>
					<Img
						src='https://syndicate.erdelyiroland.com/syndicate.png'
						alt='Syndicate logo'
						width='518'
						height='66'
					/>
					<Heading className='mt-12 text-3xl font-bold'>Dear {name},</Heading>
					<Section className='mx-0 my-6'>
						<Text className='text-xl'>Please click on the link below to reset your password!</Text>
						<Link
							className='my-4 text-xl'
							href={resetLink}>
							Reset my password
						</Link>
						<Text className='text-xl'>
							{`This link will expire in ${PASSWORD_RESET_TOKEN_EXPIRY} minutes.`}
						</Text>
					</Section>
					<Text className='text-xl'>If you didn&apos;t request this, please ignore this email.</Text>
					<Text className='text-xl'>
						Best regards,
						<br />- Syndicate
					</Text>
					<Hr className='mt-12 border border-slate-300' />
					<Text className='ml-2 text-sm text-slate-400'>Syndicate - Corporate Management System</Text>
				</Container>
			</Body>
		</Tailwind>
	</Html>
);

export default PasswordResetTemplate;

const base = {
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
