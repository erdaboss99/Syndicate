import Link from 'next/link';

const Logo = () => {
	return (
		<Link
			href='/'
			className='flex h-fit cursor-pointer select-none flex-col items-center justify-center rounded-lg border border-input bg-card p-3 pt-5 text-card-foreground shadow transition-colors duration-500 hover:bg-primary/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'>
			<h1 className='ml-[0.7em] font-fanwood-text text-xl uppercase tracking-[0.7em]'>syndicate</h1>
		</Link>
	);
};
export default Logo;
