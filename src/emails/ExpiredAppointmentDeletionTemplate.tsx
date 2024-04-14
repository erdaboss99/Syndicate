import { Column, Heading, Row, Section, Text } from '@react-email/components';

import { formatDate } from '@/lib/date';

import BaseEmailTemplate from '@/emails/BaseEmail';

export type ExpiredAppointmentDeletionTemplateProps = {
	message: string;
	deletedExpiredAppointments: { startTime: Date; endTime: Date }[];
};

export const ExpiredAppointmentDeletionTemplate = ({
	message,
	deletedExpiredAppointments,
}: ExpiredAppointmentDeletionTemplateProps) => (
	<BaseEmailTemplate previewSuffix={'Appointment Deletion Report'}>
		<Heading className='mt-12 text-3xl font-bold'>Dear Administrator,</Heading>

		<Section className='mx-0 mt-6'>
			<Text className='text-xl'>Here is the daily automatic expired appointment deletion report.</Text>
			<Text className='text-lg'>{message}</Text>
		</Section>

		{deletedExpiredAppointments.length > 0 && (
			<Section className='mx-0 mt-1'>
				<Text className='text-center text-xl font-semibold'>Deleted expired appointments</Text>
				{deletedExpiredAppointments.map((appointment, i) => {
					return (
						<Row
							key={i}
							className='text-base'>
							<Column className='text-center font-semibold'>
								{formatDate(appointment.startTime, 'WRITTEN_LONG_DATE_TIME_INTERVAL')}
							</Column>
						</Row>
					);
				})}
			</Section>
		)}
	</BaseEmailTemplate>
);

export default ExpiredAppointmentDeletionTemplate;
