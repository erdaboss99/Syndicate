import { redirect } from 'next/navigation';

import { getAppointmentById } from '@/data/appointment';
import { getIssues } from '@/data/issue';
import { formatDate } from '@/lib/date';
import { AppointmentBookQueryParamsSchema } from '@/schemas';

import AppointmentBookForm from '@/components/appointments/AppointmentBookForm';
import AppointmentWrapper from '@/components/appointments/AppointmentWrapper';

const AppointmentBookPage = async ({ params }: { params: { appointmentId: string } }) => {
	const { appointmentId } = params;
	const paramsData = AppointmentBookQueryParamsSchema.safeParse(appointmentId);
	if (!paramsData.success) redirect('/appointments');

	const appointment = await getAppointmentById(paramsData.data, 'onlyAvailable');
	if (!appointment) redirect('/appointments');
	const formattedDate = formatDate(appointment.startTime, 'writtenLongDateTimeInterval');

	const issues = await getIssues();

	return (
		<AppointmentWrapper
			headerTitle='Book appointment'
			headerLabel={formattedDate}
			size='md'
			buttonLabel='Back to date selection'
			buttonHref='/appointments'
			buttonSize='full'
			buttonVariant='link'>
			<AppointmentBookForm
				appointment={appointment}
				issues={issues}
			/>
		</AppointmentWrapper>
	);
};

export default AppointmentBookPage;
