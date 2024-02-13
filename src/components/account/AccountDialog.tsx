import { Button, ButtonProps } from '@/components/ui/Button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/Dialog';

type AccountEditDialogProps = {
	title: string;
	description: string;
	triggerButtonLabel: string;
	triggerButtonVariant: ButtonProps['variant'];
	triggerButtonSize: ButtonProps['size'];
	children: React.ReactNode;
};

const AccountDialog = ({
	title,
	description,
	triggerButtonLabel,
	triggerButtonVariant,
	triggerButtonSize,
	children,
}: AccountEditDialogProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={triggerButtonVariant}
					size={triggerButtonSize}>
					{triggerButtonLabel}
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};

export default AccountDialog;
