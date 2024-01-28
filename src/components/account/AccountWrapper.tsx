import CardWrapper, { type CardWrapperProps } from '@/components/general/CardWrapper';

type AccountWrapperProps = {
	children: React.ReactNode;
} & Omit<CardWrapperProps, 'children'>;

const AccountWrapper = ({ children, headerTitle, headerLabel }: AccountWrapperProps) => {
	return (
		<CardWrapper
			headerTitle={headerTitle}
			headerLabel={headerLabel}>
			{children}
		</CardWrapper>
	);
};

export default AccountWrapper;
