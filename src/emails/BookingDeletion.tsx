import { Column, Heading, Hr, Row, Section, Text } from '@react-email/components';

import { formatDate } from '@/lib/date';

import BaseEmailTemplate from '@/emails/BaseEmail';

export type BookingDeletionTemplateProps = {
	message: string;
	deletedBookings: {
		userName: string;
		userEmail: string;
		appointmentStartTime: Date;
		bookingDescription: string;
		issueName: string;
	}[];
};

export const BookingDeletionTemplate = ({ message, deletedBookings }: BookingDeletionTemplateProps) => (
	<BaseEmailTemplate previewSuffix={'Expired Booking Deletion Report'}>
		<Heading className='mt-12 text-3xl font-bold'>Dear Administrator,</Heading>

		<Section className='mx-0 mt-6'>
			<Text className='text-xl'>Here is the daily automatic booking deletion report.</Text>
			<Text className='text-lg'>{message}</Text>
		</Section>

		{deletedBookings.length > 0 && (
			<Section className='mx-0 mt-1'>
				<Text className='text-center text-xl font-semibold'>Deleted expired bookings</Text>
				{deletedBookings.map((booking, i) => {
					return (
						<Section
							className='mx-0 mt-1 text-base'
							key={i}>
							<Row>
								<Column className='text-left font-semibold'>Booked appointment:</Column>
								<Column className='text-right'>
									{formatDate(booking.appointmentStartTime, 'writtenLongDateTime')}
								</Column>
							</Row>

							<Row>
								<Column className='text-left font-semibold'>Booking description:</Column>
								<Column className='text-right'>{booking.bookingDescription}</Column>
							</Row>

							<Hr className='my-2 border border-slate-600' />

							<Row>
								<Column className='text-left font-semibold'>User name:</Column>
								<Column className='text-right'>{booking.userName}</Column>
							</Row>

							<Row>
								<Column className='text-left font-semibold'>User e-mail address:</Column>
								<Column className='text-right'>{booking.userEmail}</Column>
							</Row>

							<Hr className='my-2 border border-slate-600' />

							<Row>
								<Column className='text-left font-semibold'>Issue name:</Column>
								<Column className='text-right'>{booking.issueName}</Column>
							</Row>
						</Section>
					);
				})}
			</Section>
		)}
	</BaseEmailTemplate>
);

export default BookingDeletionTemplate;
