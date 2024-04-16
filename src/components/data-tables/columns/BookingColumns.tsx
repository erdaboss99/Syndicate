'use client';

import Link from 'next/link';
import { Suspense } from 'react';

import { type Booking } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { LuArrowUpDown, LuInfo, LuTrash2 } from 'react-icons/lu';

import { formatDate } from '@/lib/date';

import BookingDeleteForm from '@/components/bookings/BookingDeleteForm';
import { Button } from '@/components/ui/Button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/Dialog';

type BookingDataTableFields = Pick<Booking, 'id' | 'description' | 'createdAt'> & {
	appointmentId: string;
	appointmentStartTime: Date;
	userId: string;
	userEmail: string;
	issueId: string;
	issueName: string;
};

export const BookingColumns: ColumnDef<BookingDataTableFields>[] = [
	{
		accessorKey: 'appointmentStartTime',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Appointment
					<LuArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		enableHiding: false,
		cell: ({ row }) => {
			return (
				<time className='font-medium'>
					<Suspense fallback={null}>
						{formatDate(new Date(row.original.appointmentStartTime), 'WRITTEN_SHORT_DATE_TIME')}
					</Suspense>
				</time>
			);
		},
	},
	{
		accessorKey: 'description',
		header: 'Description',
	},
	{
		accessorKey: 'issueName',
		enableHiding: false,
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Issue Name
					<LuArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		filterFn: (row, _, id) => {
			return id.includes(row.original.issueId);
		},
	},
	{
		accessorKey: 'userEmail',
		enableHiding: false,
		header: 'User Email',
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Created at
					<LuArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<time className='font-medium'>
					<Suspense fallback={null}>
						{formatDate(new Date(row.original.createdAt), 'WRITTEN_SHORT_DATE_TIME')}
					</Suspense>
				</time>
			);
		},
	},
	{
		id: 'details',
		enableHiding: false,
		cell: ({ row }) => {
			return (
				<Button
					variant='ghost'
					className='h-8 w-8 p-0'
					asChild>
					<Link href={`/dashboard/manage-bookings/${row.original.id}`}>
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
			return (
				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant='ghost'
							className='h-8 w-8 p-0'>
							<span className='sr-only'>Delete booking</span>
							<LuTrash2 className='h-4 w-4' />
						</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<DialogTitle>{`Delete booking for ${formatDate(
								row.original.appointmentStartTime,
								'WRITTEN_SHORT_DATE_TIME',
							)}`}</DialogTitle>
							<DialogDescription>
								This action is irreversible. Please proceed with caution.
							</DialogDescription>
						</DialogHeader>
						<BookingDeleteForm id={row.original.id} />
					</DialogContent>
				</Dialog>
			);
		},
	},
];
