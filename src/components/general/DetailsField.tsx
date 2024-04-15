import { ReactNode } from 'react';

type BaseDetailsFieldProps = {
	label: string;
	children: ReactNode;
};

export const BaseDetailsField = ({ label, children }: BaseDetailsFieldProps) => {
	return (
		<div className='flex flex-row items-center justify-between p-3 shadow-sm'>
			<span className='text-sm font-medium md:text-base'>{label}</span>
			{children}
		</div>
	);
};

type HighlightedDetailsFieldProps = {
	label: string;
	value: string;
};

export const HighlightedDetailsField = ({ label, value }: HighlightedDetailsFieldProps) => {
	return (
		<BaseDetailsField label={label}>
			<span className='rounded-sm bg-secondary/90 p-[0.5rem] font-mono text-xs'>{value}</span>
		</BaseDetailsField>
	);
};
