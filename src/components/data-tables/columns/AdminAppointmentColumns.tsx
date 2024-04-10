'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Suspense } from 'react';

import { formatDate } from '@/lib/date';
import { Appointment } from '@prisma/client';

import { Button } from '@/components/ui/Button';
import { LuArrowUpDown } from 'react-icons/lu';

export type AdminAppointmentDataTableFields = Appointment;

export const AdminAppointmentColumns: ColumnDef<AdminAppointmentDataTableFields>[] = [
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
						{formatDate(new Date(row.getValue('startTime')), 'writtenLongDateTime')}
					</Suspense>
				</time>
			);
		},
	},
];
