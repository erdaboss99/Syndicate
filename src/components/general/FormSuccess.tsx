import { CheckCircle } from 'lucide-react';

type FormSuccessProps = {
	message?: string;
};

const FormSuccess = ({ message }: FormSuccessProps) => {
	if (!message) return null;

	return (
		<div className='flex items-center gap-x-4 rounded-md bg-green-600/20 p-3 font-bold text-green-600'>
			<CheckCircle className='h-7 w-7' />
			<p>{message}</p>
		</div>
	);
};

export default FormSuccess;
