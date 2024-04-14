'use client';

import { Suspense } from 'react';

import { type Appointment, type Booking } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { formatDate } from '@/lib/date';

import AppointmentBadge from '@/components/general/AppointmentBadge';
import { Button } from '@/components/ui/Button';
import { LuArrowUpDown } from 'react-icons/lu';

export type AppointmentDataTableFields = Appointment & { Booking: Pick<Booking, 'id'> | null };

export const AppointmentColumns: ColumnDef<AppointmentDataTableFields>[] = [
	{
		accessorKey: 'startTime',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Start time
					<LuArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<time className='font-medium'>
					<Suspense fallback={null}>
						{formatDate(new Date(row.original.startTime), 'WRITTEN_LONG_DATE_TIME')}
					</Suspense>
				</time>
			);
		},
	},
	{
		accessorKey: 'Booking.id',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Status
					<LuArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<AppointmentBadge
					bookingId={row.original.Booking?.id}
					badgeVariant='outline'
				/>
			);
		},
	},
];
