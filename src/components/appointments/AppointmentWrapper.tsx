import CardWrapper, { type CardWrapperProps } from '@/components/general/CardWrapper';

type AppointmentWrapperProps = {
	children: React.ReactNode;
} & Omit<CardWrapperProps, 'children'>;

const AppointmentWrapper = ({ children, headerTitle, headerLabel, size }: AppointmentWrapperProps) => {
	return (
		<CardWrapper
			size={size}
			headerTitle={headerTitle}
			headerLabel={headerLabel}>
			{children}
		</CardWrapper>
	);
};

export default AppointmentWrapper;
