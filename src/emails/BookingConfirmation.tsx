import {
	Body,
	Column,
	Container,
	Heading,
	Hr,
	Html,
	Img,
	Preview,
	Row,
	Section,
	Tailwind,
	Text,
} from '@react-email/components';

import { formatDate } from '@/lib/date';

export type BookingConfirmationTemplateProps = {
	name: string;
	appointment: Date;
	email: string;
	issueName: string;
	issueDescription: string;
	confirmationDate: Date;
};

export const BookingConfirmationTemplate = ({
	name,
	appointment,
	email,
	issueName,
	issueDescription,
	confirmationDate,
}: BookingConfirmationTemplateProps) => (
	<Html style={base}>
		<Tailwind>
			<Preview>Syndicate - Booking Confirmation</Preview>
			<Body className='bg-slate-100'>
				<Container className='mx-auto my-0 px-7 pb-12 pt-5'>
					<Img
						src='https://syndicate.erdelyiroland.com/syndicate.png'
						alt='Syndicate logo'
						width='518'
						height='66'
					/>
					<Heading className='mt-12 text-3xl font-bold'>Dear {name},</Heading>
					<Section className='mx-0 mt-6'>
						<Text className='text-xl'>Thank you for booking an appointment with us.</Text>
					</Section>
					<Section className='mx-0 mt-1'>
						<Text className='text-xl font-semibold'>Details of your booking:</Text>
						<Row className='text-base'>
							<Column className='text-left font-semibold'>Booked appointment:</Column>
							<Column className='text-right'>{formatDate(appointment, 'writtenLongDateTime')}</Column>
						</Row>
						<Hr className='my-2 border border-slate-600' />
						<Row className='text-base'>
							<Column className='text-left font-semibold'>Your name:</Column>
							<Column className='text-right'>{name}</Column>
						</Row>
						<Row className='text-base'>
							<Column className='text-left font-semibold'>Your e-mail address:</Column>
							<Column className='text-right'>{email}</Column>
						</Row>
						<Hr className='my-2 border border-slate-600' />
						<Row className='text-base'>
							<Column className='text-left font-semibold'>Issue name:</Column>
							<Column className='text-right'>{issueName}</Column>
						</Row>
						<Row className='text-base'>
							<Column className='text-left font-semibold'>Issue description:</Column>
							<Column className='text-right'>{issueDescription}</Column>
						</Row>
						<Hr className='my-2 border border-slate-600' />
						<Row className='text-base'>
							<Column className='text-left font-semibold'>Booking confirmed at:</Column>
							<Column className='text-right'>
								{formatDate(confirmationDate, 'writtenLongDateTime')}
							</Column>
						</Row>
					</Section>

					<Text className='mt-8 text-xl'>
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

export default BookingConfirmationTemplate;

const base = {
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
