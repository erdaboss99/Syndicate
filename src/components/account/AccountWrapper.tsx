import CardWrapper, { type CardWrapperProps } from '@/components/general/CardWrapper';

type AccountWrapperProps = {
	children: React.ReactNode;
} & Omit<CardWrapperProps, 'children' | 'size'>;

const AccountWrapper = ({ children, headerTitle, headerLabel }: AccountWrapperProps) => {
	return (
		<CardWrapper
			size='sm'
			headerTitle={headerTitle}
			headerLabel={headerLabel}>
			{children}
		</CardWrapper>
	);
};

export default AccountWrapper;
