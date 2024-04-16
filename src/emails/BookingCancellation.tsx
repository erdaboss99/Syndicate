import { Column, Heading, Hr, Row, Section, Text } from '@react-email/components';

import { formatDate } from '@/lib/date';

import BaseEmailTemplate from '@/emails/BaseEmail';

export type BookingCancellationTemplateProps = {
	userName: string;
	userEmail: string;
	appointmentStartTime: Date;
	bookingDescription: string;
	issueName: string;
	issueDescription: string;
};

export const BookingCancellationTemplate = ({
	userName,
	appointmentStartTime,
	bookingDescription,
	issueName,
	issueDescription,
}: BookingCancellationTemplateProps) => (
	<BaseEmailTemplate previewSuffix={'Booking cancellation'}>
		<Heading className='mt-12 text-3xl font-bold'>Dear {userName},</Heading>

		<Section className='mx-0 mt-6'>
			<Text className='text-xl'>We are sorry to hear that you have cancelled your booking.</Text>
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
				<Column className='text-left font-semibold'>Issue name:</Column>
				<Column className='text-right'>{issueName}</Column>
			</Row>

			<Row>
				<Column className='text-left font-semibold'>Issue description:</Column>
				<Column className='text-right'>{issueDescription}</Column>
			</Row>
		</Section>
	</BaseEmailTemplate>
);

export default BookingCancellationTemplate;
