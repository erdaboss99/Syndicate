import CardWrapper, { type CardWrapperProps } from '@/components/general/CardWrapper';
import { CardContent } from '@/components/ui/Card';

type AccountWrapperProps = {
	children: React.ReactNode;
} & Omit<CardWrapperProps, 'children' | 'size'>;

const AccountWrapper = ({ children, headerTitle, headerLabel }: AccountWrapperProps) => {
	return (
		<CardWrapper
			size='sm'
			headerTitle={headerTitle}
			headerLabel={headerLabel}>
			<CardContent className='mt-[3vh]'>{children}</CardContent>
		</CardWrapper>
	);
};

export default AccountWrapper;
