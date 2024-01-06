const Banner = () => {
	return (
		<div className='flex h-fit w-fit cursor-default select-none flex-col items-center justify-center divide-y-2 rounded-lg border border-input bg-card p-3 pt-5 text-card-foreground shadow transition-colors duration-500 hover:bg-primary/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'>
			<h1 className='ml-[0.7em] py-4 font-fanwood-text text-5xl uppercase tracking-[0.7em]'>syndicate</h1>
			<p className='py-4 text-2xl'>A corporate management system</p>
		</div>
	);
};
export default Banner;
