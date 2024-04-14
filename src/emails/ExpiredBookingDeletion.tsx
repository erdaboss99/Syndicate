import { Column, Heading, Hr, Row, Section, Text } from '@react-email/components';

import { formatDate } from '@/lib/date';

import BaseEmailTemplate from '@/emails/BaseEmail';

export type ExpiredBookingDeletionTemplateProps = {
	message: string;
	deletedExpiredBookings: {
		userName: string;
		userEmail: string;
		appointmentStartTime: Date;
		bookingDescription: string;
		issueName: string;
	}[];
};

export const ExpiredBookingDeletionTemplate = ({
	message,
	deletedExpiredBookings,
}: ExpiredBookingDeletionTemplateProps) => (
	<BaseEmailTemplate previewSuffix={'Expired Booking Deletion Report'}>
		<Heading className='mt-12 text-3xl font-bold'>Dear Administrator,</Heading>

		<Section className='mx-0 mt-6'>
			<Text className='text-xl'>Here is the daily automatic booking deletion report.</Text>
			<Text className='text-lg'>{message}</Text>
		</Section>

		{deletedExpiredBookings.length > 0 && (
			<Section className='mx-0 mt-1'>
				<Text className='text-center text-xl font-semibold'>Deleted expired bookings</Text>
				{deletedExpiredBookings.map((booking, i) => {
					return (
						<Section
							className='mx-0 mt-6 text-base'
							key={i}>
							<Row>
								<Column className='text-left font-semibold'>Appointment:</Column>
								<Column className='text-right'>
									{formatDate(booking.appointmentStartTime, 'WRITTEN_LONG_DATE_TIME')}
								</Column>
							</Row>

							<Row>
								<Column className='text-left font-semibold'>Description:</Column>
								<Column className='text-right'>{booking.bookingDescription}</Column>
							</Row>

							<Row>
								<Column className='text-left font-semibold'>User name:</Column>
								<Column className='text-right'>{booking.userName}</Column>
							</Row>

							<Row>
								<Column className='text-left font-semibold'>User e-mail address:</Column>
								<Column className='text-right'>{booking.userEmail}</Column>
							</Row>

							<Row>
								<Column className='text-left font-semibold'>Issue:</Column>
								<Column className='text-right'>{booking.issueName}</Column>
							</Row>

							<Hr className='my-2 border border-slate-600' />
						</Section>
					);
				})}
			</Section>
		)}
	</BaseEmailTemplate>
);

export default ExpiredBookingDeletionTemplate;
