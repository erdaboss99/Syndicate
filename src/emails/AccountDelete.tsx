import { Column, Heading, Hr, Row, Section, Text } from '@react-email/components';

import { formatDate } from '@/lib/date';

import BaseEmailTemplate from '@/emails/BaseEmail';

export type AccountDeletionTemplateProps = {
	userName: string;
	userEmail: string;
	deletedAssociatedBookings: {
		Appointment: { startTime: Date };
		description: string;
		Issue: { name: string };
	}[];
};

export const AccountDeletionTemplate = ({ userName, deletedAssociatedBookings }: AccountDeletionTemplateProps) => (
	<BaseEmailTemplate previewSuffix={'Account deletion'}>
		<Heading className='mt-12 text-3xl font-bold'>Dear {userName},</Heading>

		<Section className='mx-0 mt-6'>
			<Text className='text-xl'>We are sorry to hear that you have decided to delete your account.</Text>
			<Text className='text-xl'>We removed all of the data associated with your account.</Text>
		</Section>

		{deletedAssociatedBookings.length > 0 && (
			<Section className='mx-0 mt-1'>
				<Text className='text-center text-xl font-semibold'>Cancelled bookings</Text>
				{deletedAssociatedBookings.map((booking, i) => {
					return (
						<Section
							className='mx-0 mt-6 text-base'
							key={i}>
							<Row>
								<Column className='text-left font-semibold'>Appointment:</Column>
								<Column className='text-right'>
									{formatDate(booking.Appointment.startTime, 'WRITTEN_LONG_DATE_TIME')}
								</Column>
							</Row>

							<Row>
								<Column className='text-left font-semibold'>Description:</Column>
								<Column className='text-right'>{booking.description}</Column>
							</Row>

							<Row>
								<Column className='text-left font-semibold'>Issue:</Column>
								<Column className='text-right'>{booking.Issue.name}</Column>
							</Row>

							<Hr className='my-2 border border-slate-600' />
						</Section>
					);
				})}
			</Section>
		)}
	</BaseEmailTemplate>
);

export default AccountDeletionTemplate;
