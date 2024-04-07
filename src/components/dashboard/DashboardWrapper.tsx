import CardWrapper, { type CardWrapperProps } from '@/components/general/CardWrapper';
import { CardContent } from '@/components/ui/Card';

type DashboardWrapperProps = {
	children: React.ReactNode;
} & Omit<CardWrapperProps, 'children' | 'size'>;

const DashboardWrapper = ({ children, headerTitle, headerLabel }: DashboardWrapperProps) => {
	return (
		<CardWrapper
			size='lg'
			headerTitle={headerTitle}
			headerLabel={headerLabel}>
			<CardContent className='mt-[3vh]'>{children}</CardContent>
		</CardWrapper>
	);
};

export default DashboardWrapper;
