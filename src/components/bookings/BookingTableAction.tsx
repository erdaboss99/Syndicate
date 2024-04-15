import Link from 'next/link';

import { LuMoreHorizontal } from 'react-icons/lu';

import { type BookingDataTableFields } from '@/components/data-tables/columns/BookingColumns';
import { Button } from '@/components/ui/Button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/Dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { formatDate } from '@/lib/date';
import BookingDeleteForm from './BookingDeleteForm';

type BookingTableActionProps = {
	booking: BookingDataTableFields;
};

const BookingTableAction = ({ booking }: BookingTableActionProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<LuMoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<Link href={`/dashboard/manage-bookings/${booking.id}`}>
					<DropdownMenuItem>Booking details</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<Dialog>
					<DialogTrigger asChild>
						<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete booking</DropdownMenuItem>
					</DialogTrigger>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<DialogTitle>{`Delete booking for ${formatDate(
								booking.Appointment.startTime,
								'WRITTEN_SHORT_DATE_TIME',
							)}`}</DialogTitle>
							<DialogDescription>
								This action is irreversible. Please proceed with caution.
							</DialogDescription>
						</DialogHeader>
						<BookingDeleteForm id={booking.id} />
					</DialogContent>
				</Dialog>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default BookingTableAction;
