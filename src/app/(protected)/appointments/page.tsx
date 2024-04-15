import DateSelectionForm from '@/components/appointments/DateSelectionForm';
import { CardWrapper } from '@/components/general/CardWrapper';

const AppointmentsPage = async () => {
	return (
		<CardWrapper
			navigationTree={[{ nodeLabel: 'Date selection', nodeHref: 'appointments' }]}
			headerTitle='Date selection'
			size='MD'>
			<DateSelectionForm />
		</CardWrapper>
	);
};

export default AppointmentsPage;
