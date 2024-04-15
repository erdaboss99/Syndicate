import Link from 'next/link';

import { LuMoreHorizontal } from 'react-icons/lu';

import { type BookingDataTableFields } from '@/components/data-tables/columns/BookingColumns';
import { Button } from '@/components/ui/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

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
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default BookingTableAction;
