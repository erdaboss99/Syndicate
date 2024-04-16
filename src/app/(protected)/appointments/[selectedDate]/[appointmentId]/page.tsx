import { redirect } from 'next/navigation';

import { getAppointment } from '@/data/appointment';
import { getIssues } from '@/data/issue';
import { formatDate } from '@/lib/date';
import { AppointmentBookQueryParamsSchema } from '@/schemas';

import AppointmentBookForm from '@/components/appointments/AppointmentBookForm';
import { CardWrapper } from '@/components/general/CardWrapper';

const AppointmentBookPage = async ({ params }: { params: { appointmentId: string } }) => {
	const { appointmentId } = params;
	const paramsData = AppointmentBookQueryParamsSchema.safeParse(appointmentId);
	if (!paramsData.success) redirect('/appointments');

	const appointment = await getAppointment({
		where: {
			AND: [
				{ Booking: null },
				{
					id: params.appointmentId,
				},
			],
		},
		select: {
			id: true,
			startTime: true,
		},
	});
	if (!appointment) redirect('/appointments');

	const formattedDate = formatDate(appointment.startTime, 'WRITTEN_LONG_DATE_TIME_INTERVAL');

	const issues = await getIssues();

	return (
		<CardWrapper
			navigationTree={[
				{ nodeLabel: 'Date selection', nodeHref: 'appointments' },
				{ nodeLabel: 'Appointment selection', nodeHref: formatDate(appointment.startTime, 'YYYY-MM-DD') },
				{ nodeLabel: 'Book appointment', nodeHref: paramsData.data },
			]}
			headerTitle='Book appointment'
			headerLabel={formattedDate}
			size='MD'
			linkLabel='Back to date selection'
			linkHref='/appointments'>
			<AppointmentBookForm
				appointment={appointment}
				issues={issues}
			/>
		</CardWrapper>
	);
};

export default AppointmentBookPage;
