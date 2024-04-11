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

import { formatDate } from '@/lib/date';

export type AppointmentDeletionTemplateProps = {
	message: string;
	deletedAppointments: { startTime: Date; endTime: Date }[];
};

export const AppointmentDeletionTemplate = ({ message, deletedAppointments }: AppointmentDeletionTemplateProps) => (
	<Html style={base}>
		<Tailwind>
			<Preview>Syndicate - Appointment Deletion Report</Preview>
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

export default AppointmentDeletionTemplate;

const base = {
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
