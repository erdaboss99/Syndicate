import BreadcrumbNavigation, { type BreadcrumbNode } from '@/components/general/BreadcrumbNavigation';
import { Card, CardDescription, CardHeader } from '@/components/ui/Card';

export type CardWrapperProps = {
	navigationTree: BreadcrumbNode[] | null;
	children: React.ReactNode;
	size: 'sm' | 'md' | 'lg' | 'xl';
	headerTitle: string;
	headerLabel?: string;
};

const CardWrapper = ({ navigationTree, children, size, headerTitle, headerLabel }: CardWrapperProps) => {
	const containerSize =
		size === 'sm'
			? 'md:w-[500px]'
			: size === 'md'
				? 'md:w-[700px]'
				: size === 'lg'
					? 'md:w-[950px]'
					: 'md:w-full md:max-w-[1200px]';
	return (
		<Card className={`w-full ${containerSize}`}>
			{navigationTree && <BreadcrumbNavigation navigationTree={navigationTree} />}
			<CardHeader className='text-center font-orbitron text-4xl md:text-5xl'>{headerTitle}</CardHeader>
			{headerLabel && (
				<CardDescription className='text-center font-orbitron text-xl md:text-2xl'>
					{headerLabel}
				</CardDescription>
			)}
			{children}
		</Card>
	);
};

export default CardWrapper;
