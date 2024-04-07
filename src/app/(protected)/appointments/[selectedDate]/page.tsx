import { database } from '@/lib/database';
import { formatDate, getIntervalFromDay } from '@/lib/date';
import { appointmentSelectQueryParamsSchema } from '@/schemas';

const AppointmentSelectPage = async ({ params }: { params: { selectedDate: string } }) => {
	const { selectedDate } = params;
	const paramsData = appointmentSelectQueryParamsSchema.safeParse(selectedDate);

	if (!paramsData.success)
		return (
			<InfoCard
				headerText={VALIDATION_DEFAULT_ERROR}
				descriptionText={paramsData.error.errors[0].message}
				buttonText={INFO_CARD_BACK_TO_APPOINTMENTS_TEXT}
				redirectRoute='/appointment'
			/>
		);

	const currentDate = new Date(paramsData.data);
	const formattedDate = formatDate(currentDate, 'writtenLongDate');
	const interval = getIntervalFromDay(currentDate);

	const appointments = await database.appointment.findMany({
		where: {
			AND: [
				{ Booking: null },
				{
					startTime: {
						gte: interval.start,
						lte: interval.end,
					},
				},
			],
		},
	});

	return (
		<main className='flex flex-col items-center'>
			<Card className='h-full w-fit min-w-[400px] p-3 transition-all lg:w-full lg:p-5'>
				<CardHeader
					data-testid='appointmentselectpage-card-header'
					className='text-center text-2xl font-bold lg:text-3xl'>
					{APPOINTMENT_SELECT_PAGE_CARD_HEADER_TEXT}
				</CardHeader>

				<CardDescription
					data-testid='appointmentselectpage-card-description'
					className='text-center text-xl lg:text-2xl'>
					{formattedDate}
				</CardDescription>

				<CardContent
					data-testid='appointmentselectpage-appointment-container'
					className='mt-[5vh] flex flex-row items-center justify-center gap-5'>
					{appointments.length > 0 &&
						appointments.map((appointment) => (
							<AppointmentSelectButton
								key={appointment.id}
								appointment={appointment}
							/>
						))}
					{appointments.length <= 0 && (
						<p data-testid='appointmentselectpage-noappointments-description'>
							{APPOINTMENT_SELECT_PAGE_NO_APPOINTMENTS_TEXT}
						</p>
					)}
				</CardContent>
			</Card>
		</main>
	);
};

export default AppointmentSelectPage;
