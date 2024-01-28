import { FaExclamationCircle } from 'react-icons/fa';

type FormInfoProps = {
	message?: string;
};

const FormInfo = ({ message }: FormInfoProps) => {
	if (!message) return null;

	return (
		<div className='flex w-full items-center gap-x-4 rounded-md bg-secondary p-3 font-bold text-secondary-foreground'>
			<FaExclamationCircle className='h-7 w-7' />
			<p>{message}</p>
		</div>
	);
};

export default FormInfo;
