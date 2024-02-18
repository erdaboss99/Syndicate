import CardWrapper, { type CardWrapperProps } from '@/components/general/CardWrapper';

type DashboardWrapperProps = {
	children: React.ReactNode;
} & Omit<CardWrapperProps, 'children'>;

const DashboardWrapper = ({ children, headerTitle, headerLabel }: DashboardWrapperProps) => {
	return (
		<CardWrapper
			headerTitle={headerTitle}
			headerLabel={headerLabel}>
			{children}
		</CardWrapper>
	);
};

export default DashboardWrapper;
