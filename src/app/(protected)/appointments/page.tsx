import AppointmentWrapper from '@/components/appointments/AppointmentWrapper';
import DateSelectionForm from '@/components/appointments/DateSelectionForm';

const AppointmentsPage = async () => {
	return (
		<AppointmentWrapper
			headerTitle='Date selection'
			size='md'>
			<DateSelectionForm />
		</AppointmentWrapper>
	);
};

export default AppointmentsPage;
