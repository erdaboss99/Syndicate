import { Body, Container, Hr, Html, Img, Preview, Tailwind, Text } from '@react-email/components';

type BaseEmailTemplateProps = {
	previewSuffix: string;
	children: React.ReactNode;
};

export const BaseEmailTemplate = ({ previewSuffix, children }: BaseEmailTemplateProps) => (
	<Html style={base}>
		<Tailwind>
			<Preview>{`Syndicate - ${previewSuffix}`}</Preview>

			<Body className='bg-slate-100'>
				<Container className='mx-auto my-0 pb-12 pt-5'>
					<Img
						src='https://syndicate.erdelyiroland.com/syndicate.png'
						alt='Syndicate logo'
						width='518'
						height='66'
					/>

					{children}

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

export default BaseEmailTemplate;

const base = {
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
