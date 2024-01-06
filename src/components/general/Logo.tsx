const Logo = () => {
	return (
		<div className='flex h-fit w-fit cursor-pointer select-none flex-col items-center justify-center rounded-lg border border-input bg-card p-1 pt-3 text-card-foreground shadow transition-colors duration-500 hover:bg-primary/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'>
			<span className='ml-[0.7em] font-fanwood-text text-lg uppercase tracking-[0.7em]'>syndicate</span>
		</div>
	);
};
export default Logo;
