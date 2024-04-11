import { Column, Heading, Row, Section, Text } from '@react-email/components';

import { formatDate } from '@/lib/date';

import BaseEmailTemplate from '@/emails/BaseEmail';

export type AppointmentDeletionTemplateProps = {
	message: string;
	deletedAppointments: { startTime: Date; endTime: Date }[];
};

export const AppointmentDeletionTemplate = ({ message, deletedAppointments }: AppointmentDeletionTemplateProps) => (
	<BaseEmailTemplate previewSuffix={'Appointment Deletion Report'}>
		<Heading className='mt-12 text-3xl font-bold'>Dear Administrator,</Heading>

		<Section className='mx-0 mt-6'>
			<Text className='text-xl'>Here is the daily automatic appointment deletion report.</Text>
			<Text className='text-lg'>{message}</Text>
		</Section>

		{deletedAppointments.length > 0 && (
			<Section className='mx-0 mt-1'>
				<Text className='text-center text-xl font-semibold'>Deleted appointments</Text>
				{deletedAppointments.map((elem, i) => {
					return (
						<Row
							key={i}
							className='text-base'>
							<Column className='text-center font-semibold'>
								{formatDate(elem.startTime, 'writtenLongDateTimeInterval')}
							</Column>
						</Row>
					);
				})}
			</Section>
		)}
	</BaseEmailTemplate>
);

export default AppointmentDeletionTemplate;
