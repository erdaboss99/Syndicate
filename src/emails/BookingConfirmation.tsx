import { Column, Heading, Hr, Row, Section, Text } from '@react-email/components';

import { formatDate } from '@/lib/date';

import BaseEmailTemplate from '@/emails/BaseEmail';

export type BookingConfirmationTemplateProps = {
	userName: string;
	userEmail: string;
	appointmentStartTime: Date;
	bookingDescription: string;
	issueName: string;
	issueDescription: string;
	bookingConfirmationDate: Date;
};

export const BookingConfirmationTemplate = ({
	userName,
	userEmail,
	appointmentStartTime,
	bookingDescription,
	issueName,
	issueDescription,
	bookingConfirmationDate,
}: BookingConfirmationTemplateProps) => (
	<BaseEmailTemplate previewSuffix={'Booking Confirmation'}>
		<Heading className='mt-12 text-3xl font-bold'>Dear {userName},</Heading>

		<Section className='mx-0 mt-6'>
			<Text className='text-xl'>Thank you for booking an appointment with us.</Text>
		</Section>

		<Section className='mx-0 mt-1 text-base'>
			<Text className='text-xl font-semibold'>Details of your booking:</Text>

			<Row>
				<Column className='text-left font-semibold'>Booked appointment:</Column>
				<Column className='text-right'>{formatDate(appointmentStartTime, 'WRITTEN_LONG_DATE_TIME')}</Column>
			</Row>

			<Row>
				<Column className='text-left font-semibold'>Booking description:</Column>
				<Column className='text-right'>{bookingDescription}</Column>
			</Row>

			<Hr className='my-2 border border-slate-600' />

			<Row>
				<Column className='text-left font-semibold'>Your name:</Column>
				<Column className='text-right'>{userName}</Column>
			</Row>

			<Row>
				<Column className='text-left font-semibold'>Your e-mail address:</Column>
				<Column className='text-right'>{userEmail}</Column>
			</Row>

			<Hr className='my-2 border border-slate-600' />

			<Row>
				<Column className='text-left font-semibold'>Issue name:</Column>
				<Column className='text-right'>{issueName}</Column>
			</Row>

			<Row>
				<Column className='text-left font-semibold'>Issue description:</Column>
				<Column className='text-right'>{issueDescription}</Column>
			</Row>

			<Hr className='my-2 border border-slate-600' />

			<Row>
				<Column className='text-left font-semibold'>Booking confirmed at:</Column>
				<Column className='text-right'>{formatDate(bookingConfirmationDate, 'WRITTEN_LONG_DATE_TIME')}</Column>
			</Row>
		</Section>
	</BaseEmailTemplate>
);

export default BookingConfirmationTemplate;
