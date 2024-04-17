import { ReactNode } from 'react';

type BaseDetailsFieldProps = {
	label: string;
	children: ReactNode;
	fieldDataTestId?: string;
};

export const BaseDetailsField = ({ label, children, fieldDataTestId }: BaseDetailsFieldProps) => {
	return (
		<div
			data-testid={fieldDataTestId}
			className='flex flex-row items-center justify-between p-3 shadow-sm'>
			<span className='text-sm font-medium md:text-base'>{label}</span>
			{children}
		</div>
	);
};

type HighlightedDetailsFieldProps = {
	value: string;
} & Omit<BaseDetailsFieldProps, 'children'>;

export const HighlightedDetailsField = ({ label, value, fieldDataTestId }: HighlightedDetailsFieldProps) => {
	return (
		<BaseDetailsField
			label={label}
			fieldDataTestId={fieldDataTestId}>
			<span className='rounded-sm bg-secondary/90 p-[0.5rem] font-mono text-xs'>{value}</span>
		</BaseDetailsField>
	);
};
