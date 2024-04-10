'use client';

import { useRouter } from 'next/navigation';

import { formatDate } from '@/lib/date';
import { Appointment } from '@prisma/client';

import { Button } from '@/components/ui/Button';

type AppointmentSelectButtonProps = {
	appointment: Appointment;
};

const AppointmentSelectButton = ({ appointment }: AppointmentSelectButtonProps) => {
	const router = useRouter();

	const formattedDate = formatDate(appointment.startTime, 'onlyTime');

	return (
		<Button
			onClick={() => router.push(`/appointments/book/${appointment.id}`)}
			size='lg'
			variant='outline'
			className='font-bold'>
			{formattedDate}
			<time dateTime={appointment.startTime.toISOString()} />
		</Button>
	);
};

export default AppointmentSelectButton;
