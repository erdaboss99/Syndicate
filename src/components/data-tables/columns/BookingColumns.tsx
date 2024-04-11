'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Suspense } from 'react';

import { formatDate } from '@/lib/date';
import { type Appointment, type Booking, type Issue, type User } from '@prisma/client';

import { Button } from '@/components/ui/Button';
import { LuArrowUpDown } from 'react-icons/lu';

export type BookingDataTableFields = Pick<Booking, 'id' | 'description' | 'createdAt'> & {
	Appointment: Pick<Appointment, 'id' | 'startTime'>;
} & { User: Pick<User, 'id' | 'email'> } & { Issue: Pick<Issue, 'id' | 'name'> };

export const BookingColumns: ColumnDef<BookingDataTableFields>[] = [
	{
		accessorKey: 'Appointment.startTime',
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
						{formatDate(new Date(row.original.Appointment.startTime), 'writtenShortDateTime')}
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
		accessorKey: 'Issue.name',
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
			return id.includes(row.original.Issue.id);
		},
	},
	{
		accessorKey: 'User.email',
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
						{formatDate(new Date(row.original.createdAt), 'writtenShortDateTime')}
					</Suspense>
				</time>
			);
		},
	},
];
