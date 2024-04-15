import BreadcrumbNavigation, { type BreadcrumbNode } from '@/components/general/BreadcrumbNavigation';
import { Card, CardDescription, CardHeader } from '@/components/ui/Card';

export type CardWrapperProps = {
	navigationTree: BreadcrumbNode[] | null;
	children: React.ReactNode;
	size: 'SM' | 'MD' | 'LG' | 'XL';
	headerTitle: string;
	headerLabel?: string;
};

const CardWrapper = ({ navigationTree, children, size, headerTitle, headerLabel }: CardWrapperProps) => {
	const containerSize =
		size === 'SM'
			? 'md:w-[500px]'
			: size === 'MD'
				? 'md:w-[700px]'
				: size === 'LG'
					? 'md:w-[950px]'
					: 'md:w-full md:max-w-[1200px]';
	return (
		<Card className={`w-full ${containerSize}`}>
			{navigationTree && <BreadcrumbNavigation navigationTree={navigationTree} />}
			<CardHeader>{headerTitle}</CardHeader>
			{headerLabel && <CardDescription>{headerLabel}</CardDescription>}
			{children}
		</Card>
	);
};

export default CardWrapper;
