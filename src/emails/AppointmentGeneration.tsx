import { Column, Heading, Row, Section, Text } from '@react-email/components';

import { formatDate } from '@/lib/date';

import BaseEmailTemplate from '@/emails/BaseEmail';

export type AppointmentGenerationTemplateProps = {
	message: string;
	intervalStart: Date;
	intervalEnd: Date;
	workDaysInInterval: Date[];
	weekendDaysInInterval: Date[];
	createdAppointments: { startTime: Date; endTime: Date }[];
};

export const AppointmentGenerationTemplate = ({
	message,
	intervalStart,
	intervalEnd,
	workDaysInInterval,
	weekendDaysInInterval,
	createdAppointments,
}: AppointmentGenerationTemplateProps) => (
	<BaseEmailTemplate previewSuffix={'Appointment Generation Report'}>
		<Heading className='mt-12 text-3xl font-bold'>Dear Administrator,</Heading>

		<Section className='mx-0 mt-6'>
			<Text className='text-xl'>Here is the daily automatic appointment generation report.</Text>
			<Text className='text-lg'>{message}</Text>
		</Section>

		<Section className='mx-0 mt-1'>
			<Text className='text-center text-xl font-semibold'>Current interval</Text>
			<Row className='text-base'>
				<Column className='text-left font-semibold'>{formatDate(intervalStart, 'writtenLongDateTime')}</Column>
				<Column className='text-center'>-</Column>
				<Column className='text-right font-semibold'>{formatDate(intervalEnd, 'writtenLongDateTime')}</Column>
			</Row>
		</Section>

		<Section className='mx-0 mt-1'>
			<Text className='text-center text-xl font-semibold'>Affected workdays in the given interval</Text>
			{workDaysInInterval.map((elem, i) => {
				return (
					<Row
						key={i}
						className='text-base'>
						<Column className='text-center font-semibold'>{formatDate(elem, 'writtenLongDate')}</Column>
					</Row>
				);
			})}
		</Section>

		<Section className='mx-0 mt-1'>
			<Text className='text-center text-xl font-semibold'>Skipped weekend days in the given interval</Text>
			{weekendDaysInInterval.map((elem, i) => {
				return (
					<Row
						key={i}
						className='text-base'>
						<Column className='text-center font-semibold'>{formatDate(elem, 'writtenLongDate')}</Column>
					</Row>
				);
			})}
		</Section>

		<Section className='mx-0 mt-1'>
			{createdAppointments.length > 0 ? (
				<Text className='text-center text-xl font-semibold'>Newly created appointments</Text>
			) : (
				<Text className='text-center text-xl font-semibold'>No new appointments were created</Text>
			)}
			{createdAppointments.length > 0 &&
				createdAppointments.map((elem, i) => {
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
	</BaseEmailTemplate>
);

export default AppointmentGenerationTemplate;
