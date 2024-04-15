import { FaExclamationCircle } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { LuAlertTriangle, LuCheckCircle } from 'react-icons/lu';

import { cn } from '@/lib/utils';

type FormStatusProps = {
	Icon: IconType;
	extraClasses: string;
	message?: string;
};

const FormStatus = ({ message, extraClasses, Icon }: FormStatusProps) => {
	if (!message) return null;

	return (
		<div className={cn('flex w-full items-center gap-x-4 rounded-md p-3 font-bold', extraClasses)}>
			<Icon className='h-7 w-7' />
			<p>{message}</p>
		</div>
	);
};

type FormStatusMessage = Pick<FormStatusProps, 'message'>;

export const FormError = ({ message }: FormStatusMessage) => {
	return (
		<FormStatus
			message={message}
			extraClasses='bg-destructive/15 text-destructive'
			Icon={FaExclamationCircle}
		/>
	);
};

export const FormInfo = ({ message }: FormStatusMessage) => {
	return (
		<FormStatus
			message={message}
			extraClasses='bg-secondary text-secondary-foreground'
			Icon={LuAlertTriangle}
		/>
	);
};

export const FormSuccess = ({ message }: FormStatusMessage) => {
	return (
		<FormStatus
			message={message}
			extraClasses='bg-success/20 text-success'
			Icon={LuCheckCircle}
		/>
	);
};
