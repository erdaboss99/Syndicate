'use client';

import Link from 'next/link';
import { Suspense } from 'react';

import { type Appointment } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { LuArrowUpDown, LuInfo, LuTrash2 } from 'react-icons/lu';

import { formatDate } from '@/lib/date';

import AppointmentDeleteForm from '@/components/appointments/AppointmentDeleteForm';
import { AppointmentBadge } from '@/components/general/CustomBadge';
import { Button } from '@/components/ui/Button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/Dialog';

export type AppointmentDataTableFields = Appointment & { bookingId: string | null };

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
		accessorKey: 'bookingId',
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
					status={row.original.bookingId === null ? 'AVAILABLE' : 'BOOKED'}
					variant='outline'
				/>
			);
		},
	},
	{
		id: 'details',
		enableHiding: false,
		cell: ({ row }) => {
			if (row.original.bookingId === null)
				return (
					<Button
						variant='ghost'
						className='h-8 w-8 p-0'
						disabled>
						<span className='sr-only'>View details</span>
						<LuInfo className='h-4 w-4' />
					</Button>
				);

			return (
				<Button
					variant='ghost'
					className='h-8 w-8 p-0'
					asChild>
					<Link href={`/dashboard/manage-bookings/${row.original.bookingId}`}>
						<span className='sr-only'>View details</span>
						<LuInfo className='h-4 w-4' />
					</Link>
				</Button>
			);
		},
	},
	{
		id: 'delete',
		enableHiding: false,
		cell: ({ row }) => {
			if (row.original.bookingId !== null)
				return (
					<Button
						variant='ghost'
						className='h-8 w-8 p-0'
						disabled>
						<span className='sr-only'>Delete appointment</span>
						<LuTrash2 className='h-4 w-4' />
					</Button>
				);

			return (
				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant='ghost'
							className='h-8 w-8 p-0'>
							<span className='sr-only'>Delete appointment</span>
							<LuTrash2 className='h-4 w-4' />
						</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<DialogTitle>{`Delete appointment at ${formatDate(
								row.original.startTime,
								'WRITTEN_SHORT_DATE_TIME',
							)}`}</DialogTitle>
							<DialogDescription>
								This action is irreversible. Please proceed with caution.
							</DialogDescription>
						</DialogHeader>
						<AppointmentDeleteForm id={row.original.id} />
					</DialogContent>
				</Dialog>
			);
		},
	},
];
