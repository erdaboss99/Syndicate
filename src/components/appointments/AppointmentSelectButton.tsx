import Link from 'next/link';

import { type Appointment } from '@prisma/client';

import { formatDate } from '@/lib/date';

import { Button } from '@/components/ui/Button';

type AppointmentSelectButtonProps = {
	appointment: Appointment;
};

const AppointmentSelectButton = ({ appointment }: AppointmentSelectButtonProps) => {
	const formattedDate = formatDate(appointment.startTime, 'ONLY_TIME');
	const appointmentBookPath = `/appointments/${formatDate(appointment.startTime, 'YYYY-MM-DD')}/${appointment.id}`;

	return (
		<Button
			size='lg'
			variant='outline'
			className='font-bold'
			asChild>
			<Link href={appointmentBookPath}>
				{formattedDate}
				<time dateTime={appointment.startTime.toISOString()} />
			</Link>
		</Button>
	);
};

export default AppointmentSelectButton;
