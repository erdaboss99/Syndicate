import CardWrapper, { type CardWrapperProps } from '@/components/general/CardWrapper';

type DashboardWrapperProps = {
	children: React.ReactNode;
} & Omit<CardWrapperProps, 'children' | 'size'>;

const DashboardWrapper = ({ children, headerTitle, headerLabel }: DashboardWrapperProps) => {
	return (
		<CardWrapper
			size='lg'
			headerTitle={headerTitle}
			headerLabel={headerLabel}>
			{children}
		</CardWrapper>
	);
};

export default DashboardWrapper;
