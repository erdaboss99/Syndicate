import { LuCheckCircle } from 'react-icons/lu';

type FormSuccessProps = {
	message?: string;
};

const FormSuccess = ({ message }: FormSuccessProps) => {
	if (!message) return null;

	return (
		<div className='flex w-full items-center gap-x-4 rounded-md bg-success/20 p-3 font-bold text-success'>
			<LuCheckCircle className='h-7 w-7' />
			<p>{message}</p>
		</div>
	);
};

export default FormSuccess;
