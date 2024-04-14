import CardWrapper, { type CardWrapperProps } from '@/components/general/CardWrapper';

type AccountWrapperProps = {
	children: React.ReactNode;
} & Omit<CardWrapperProps, 'children' | 'size'>;

const AccountWrapper = ({ navigationTree, children, headerTitle, headerLabel }: AccountWrapperProps) => {
	return (
		<CardWrapper
			navigationTree={navigationTree}
			size='SM'
			headerTitle={headerTitle}
			headerLabel={headerLabel}>
			{children}
		</CardWrapper>
	);
};

export default AccountWrapper;
