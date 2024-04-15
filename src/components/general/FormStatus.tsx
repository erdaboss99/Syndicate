import { VariantProps, cva } from 'class-variance-authority';

import { FaExclamationCircle } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { LuAlertTriangle, LuCheckCircle } from 'react-icons/lu';

const formStatusVariants = cva('flex w-full items-center gap-x-4 rounded-md p-3 font-bold', {
	variants: {
		status: {
			INFO: 'bg-secondary text-secondary-foreground',
			ERROR: 'bg-destructive/15 text-destructive',
			SUCCESS: 'bg-success/20 text-success',
		},
	},
});

type BaseFormStatusProps = {
	Icon: IconType;
	message?: string;
} & VariantProps<typeof formStatusVariants>;

const BaseFormStatus = ({ message, status, Icon }: BaseFormStatusProps) => {
	if (!message) return null;

	return (
		<div className={formStatusVariants({ status })}>
			<Icon className='h-7 w-7' />
			<p>{message}</p>
		</div>
	);
};

type FormStatusProps = Pick<BaseFormStatusProps, 'message'>;

export const FormError = ({ message }: FormStatusProps) => {
	return (
		<BaseFormStatus
			message={message}
			status='ERROR'
			Icon={FaExclamationCircle}
		/>
	);
};

export const FormInfo = ({ message }: FormStatusProps) => {
	return (
		<BaseFormStatus
			message={message}
			status='INFO'
			Icon={LuAlertTriangle}
		/>
	);
};

export const FormSuccess = ({ message }: FormStatusProps) => {
	return (
		<BaseFormStatus
			message={message}
			status='SUCCESS'
			Icon={LuCheckCircle}
		/>
	);
};
