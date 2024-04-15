import { Column, Heading, Hr, Row, Section, Text } from '@react-email/components';

import { formatDate } from '@/lib/date';

import BaseEmailTemplate from '@/emails/BaseEmail';

export type BookingDeletionTemplateProps = {
	userName: string;
	userEmail: string;
	appointmentStartTime: Date;
	bookingDescription: string;
	issueName: string;
	issueDescription: string;
	reason: string;
};

export const BookingDeletionTemplate = ({
	userName,
	userEmail,
	appointmentStartTime,
	bookingDescription,
	issueName,
	issueDescription,
	reason,
}: BookingDeletionTemplateProps) => (
	<BaseEmailTemplate previewSuffix={'Booking deletion'}>
		<Heading className='mt-12 text-3xl font-bold'>Dear {userName},</Heading>

		<Section className='mx-0 mt-6'>
			<Text className='text-xl'>We are sorry to inform you that your booking has been deleted.</Text>
			<Text className='text-xl'>Reason for the deletion: {reason}</Text>
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
		</Section>
	</BaseEmailTemplate>
);

export default BookingDeletionTemplate;
