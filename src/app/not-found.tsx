import LinkButton from '@/components/general/LinkButton';
import { Separator } from '@/components/ui/Separator';

const NotFoundPage = () => {
	return (
		<div className='flex h-fit w-full flex-col items-center justify-center space-y-16 md:w-[800px]'>
			<h1 className='ml-[0.7em] py-4 font-fanwood-text text-3xl uppercase tracking-[0.7em] md:text-5xl'>
				syndicate
			</h1>
			<div className='flex h-full flex-row items-center justify-center gap-4 font-orbitron text-2xl text-destructive md:gap-6 md:text-3xl'>
				<h2>404</h2>
				<Separator
					orientation='vertical'
					className='h-[36px] w-[2px] bg-destructive md:h-[40px]'
					decorative
				/>
				<h2>Page not found!</h2>
			</div>
			<LinkButton
				buttonLabel='Back to home'
				buttonHref='/'
				buttonSize='full'
				buttonVariant='link'
			/>
		</div>
	);
};

export default NotFoundPage;
