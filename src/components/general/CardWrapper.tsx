import { Card, CardDescription, CardHeader } from '@/components/ui/Card';

export type CardWrapperProps = {
	children: React.ReactNode;
	size: 'sm' | 'md' | 'lg';
	headerTitle: string;
	headerLabel?: string;
};

const CardWrapper = ({ children, size, headerTitle, headerLabel }: CardWrapperProps) => {
	const containerSize = size === 'sm' ? 'md:w-[500px]' : size === 'md' ? 'md:w-[700px]' : 'md:w-[950px]';
	return (
		<Card className={`w-full ${containerSize}`}>
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
