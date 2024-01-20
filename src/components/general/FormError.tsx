import { LuAlertTriangle } from 'react-icons/lu';

type FormErrorProps = {
	message?: string;
};

const FormError = ({ message }: FormErrorProps) => {
	if (!message) return null;

	return (
		<div className='flex items-center gap-x-4 rounded-md bg-destructive/15 p-3 font-bold text-destructive'>
			<LuAlertTriangle className='h-7 w-7' />
			<p>{message}</p>
		</div>
	);
};

export default FormError;
