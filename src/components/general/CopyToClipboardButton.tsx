'use client';

type CopyToClipboardButtonProps = {
	value: string;
	children: React.ReactNode;
};

const CopyToClipboard = ({ value, children }: CopyToClipboardButtonProps) => {
	const onClick = () => {
		navigator.clipboard.writeText(value);
	};

	return (
		<span
			onClick={onClick}
			className='cursor-pointer'>
			{children}
		</span>
	);
};

export default CopyToClipboard;
