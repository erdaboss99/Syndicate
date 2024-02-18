import { Card, CardDescription, CardHeader } from '@/components/ui/Card';

export type CardWrapperProps = {
	children: React.ReactNode;
	headerTitle: string;
	headerLabel?: string;
};

const CardWrapper = ({ children, headerTitle, headerLabel }: CardWrapperProps) => {
	return (
		<Card className='w-full md:w-[950px]'>
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
