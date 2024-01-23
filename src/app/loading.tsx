import { LuLoader2 } from 'react-icons/lu';

const LoadingPage = () => {
	return (
		<div className='flex h-fit w-full cursor-default select-none flex-col items-center justify-center space-y-4 p-3 pt-5 md:w-[800px]'>
			<h1 className='ml-[0.7em]  py-4 font-fanwood-text text-3xl uppercase tracking-[0.7em] md:text-5xl'>
				syndicate
			</h1>
			<LuLoader2 className='animate-dynamic-spin text-3xl text-foreground/50 md:text-4xl' />
		</div>
	);
};

export default LoadingPage;
