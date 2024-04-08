import { formatDate } from '@/lib/date';
import {
	Body,
	Column,
	Container,
	Heading,
	Hr,
	Html,
	Img,
	Preview,
	Row,
	Section,
	Tailwind,
	Text,
} from '@react-email/components';

export type AppointmentHandlingTemplateProps = {
	message: string;
	intervalStart: Date;
	intervalEnd: Date;
	workDaysInInterval: Date[];
	weekendDaysInInterval: Date[];
	createdAppointments: { startTime: Date; endTime: Date }[];
};

export const AppointmentHandlingTemplate = ({
	message,
	intervalStart,
	intervalEnd,
	workDaysInInterval,
	weekendDaysInInterval,
	createdAppointments,
}: AppointmentHandlingTemplateProps) => (
	<Html style={base}>
		<Tailwind>
			<Preview>Syndicate - Appointment Handling Report</Preview>
			<Body className='bg-slate-100'>
				<Container className='mx-auto my-0 px-7 pb-12 pt-5'>
					<Img
						src='https://syndicate.erdelyiroland.com/syndicate.png'
						alt='Syndicate logo'
						width='518'
						height='66'
					/>
					<Heading className='mt-12 text-3xl font-bold'>Dear Administrator,</Heading>
					<Section className='mx-0 mt-6'>
						<Text className='text-xl'>Here is the daily automatic appointment generation report.</Text>
						<Text className='text-lg'>{message}</Text>
					</Section>
					<Section className='mx-0 mt-1'>
						<Text className='text-center text-xl font-semibold'>Current interval</Text>
						<Row className='text-base'>
							<Column className='text-left font-semibold'>
								{formatDate(intervalStart, 'writtenLongDateTime')}
							</Column>
							<Column className='text-center'>-</Column>
							<Column className='text-right font-semibold'>
								{formatDate(intervalEnd, 'writtenLongDateTime')}
							</Column>
						</Row>
					</Section>
					<Section className='mx-0 mt-1'>
						<Text className='text-center text-xl font-semibold'>
							Affected workdays in the given interval
						</Text>
						{workDaysInInterval.map((elem, i) => {
							return (
								<Row
									key={i}
									className='text-base'>
									<Column className='text-center font-semibold'>
										{formatDate(elem, 'writtenLongDate')}
									</Column>
								</Row>
							);
						})}
					</Section>

					<Section className='mx-0 mt-1'>
						<Text className='text-center text-xl font-semibold'>
							Skipped weekend days in the given interval
						</Text>
						{weekendDaysInInterval.map((elem, i) => {
							return (
								<Row
									key={i}
									className='text-base'>
									<Column className='text-center font-semibold'>
										{formatDate(elem, 'writtenLongDate')}
									</Column>
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

					<Text className='mt-8 text-xl'>
						Best regards,
						<br />- Syndicate
					</Text>
					<Hr className='mt-12 border border-slate-300' />
					<Text className='ml-2 text-sm text-slate-400'>Syndicate - Corporate Management System</Text>
				</Container>
			</Body>
		</Tailwind>
	</Html>
);

export default AppointmentHandlingTemplate;

const base = {
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
