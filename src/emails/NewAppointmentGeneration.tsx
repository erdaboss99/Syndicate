import { Column, Heading, Row, Section, Text } from '@react-email/components';

import { formatDate } from '@/lib/date';

import BaseEmailTemplate from '@/emails/BaseEmail';

export type NewAppointmentGenerationTemplateProps = {
	message: string;
	intervalStart: Date;
	intervalEnd: Date;
	workDaysInInterval: Date[];
	weekendDaysInInterval: Date[];
	generatedNewAppointments: { startTime: Date; endTime: Date }[];
};

export const NewAppointmentGenerationTemplate = ({
	message,
	intervalStart,
	intervalEnd,
	workDaysInInterval,
	weekendDaysInInterval,
	generatedNewAppointments,
}: NewAppointmentGenerationTemplateProps) => (
	<BaseEmailTemplate previewSuffix={'Appointment Generation Report'}>
		<Heading className='mt-12 text-3xl font-bold'>Dear Administrator,</Heading>

		<Section className='mx-0 mt-6'>
			<Text className='text-xl'>Here is the daily automatic appointment generation report.</Text>
			<Text className='text-lg'>{message}</Text>
		</Section>

		<Section className='mx-0 mt-1'>
			<Text className='text-center text-xl font-semibold'>Current interval</Text>
			<Row className='text-base'>
				<Column className='text-left font-semibold'>
					{formatDate(intervalStart, 'WRITTEN_LONG_DATE_TIME')}
				</Column>
				<Column className='text-center'>-</Column>
				<Column className='text-right font-semibold'>
					{formatDate(intervalEnd, 'WRITTEN_LONG_DATE_TIME')}
				</Column>
			</Row>
		</Section>

		<Section className='mx-0 mt-1'>
			<Text className='text-center text-xl font-semibold'>Affected workdays in the given interval</Text>
			{workDaysInInterval.map((day, i) => {
				return (
					<Row
						key={i}
						className='text-base'>
						<Column className='text-center font-semibold'>{formatDate(day, 'WRITTEN_LONG_DATE')}</Column>
					</Row>
				);
			})}
		</Section>

		<Section className='mx-0 mt-1'>
			<Text className='text-center text-xl font-semibold'>Skipped weekend days in the given interval</Text>
			{weekendDaysInInterval.map((day, i) => {
				return (
					<Row
						key={i}
						className='text-base'>
						<Column className='text-center font-semibold'>{formatDate(day, 'WRITTEN_LONG_DATE')}</Column>
					</Row>
				);
			})}
		</Section>

		<Section className='mx-0 mt-1'>
			{generatedNewAppointments.length > 0 ? (
				<Text className='text-center text-xl font-semibold'>Newly generated appointments</Text>
			) : (
				<Text className='text-center text-xl font-semibold'>No new appointments were generated</Text>
			)}
			{generatedNewAppointments.length > 0 &&
				generatedNewAppointments.map((appointment, i) => {
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
	</BaseEmailTemplate>
);

export default NewAppointmentGenerationTemplate;
