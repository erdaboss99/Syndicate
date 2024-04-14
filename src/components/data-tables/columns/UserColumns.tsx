'use client';

import { Suspense } from 'react';

import { UserRole, type User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { formatDate } from '@/lib/date';

import UserAvatar from '@/components/general/UserAvatar';
import UserRoleBadge from '@/components/general/UserBadge';
import { Button } from '@/components/ui/Button';
import UserTableAction from '@/components/users/UserTableAction';
import { LuArrowUpDown } from 'react-icons/lu';

export type UserDataTableFields = Pick<User, 'id' | 'name' | 'email' | 'role' | 'emailVerified' | 'lastSeen' | 'image'>;

export const UserColumns: ColumnDef<UserDataTableFields>[] = [
	{
		accessorKey: 'image',
		enableHiding: false,
		header: 'Avatar',
		cell: ({ row }) => {
			return <UserAvatar src={row.original.image!} />;
		},
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Name
					<LuArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Email
					<LuArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'role',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Role
					<LuArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<UserRoleBadge
					role={row.original.role as UserRole}
					badgeVariant='outline'
				/>
			);
		},
		filterFn: (row, _, id) => {
			return id.includes(row.original.role);
		},
	},
	{
		accessorKey: 'emailVerified',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Email verified
					<LuArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			if (row.original.emailVerified === null) return <div className='font-medium'>Not yet verified</div>;

			return (
				<time className='font-medium'>
					<Suspense fallback={null}>
						{formatDate(new Date(row.original.emailVerified), 'WRITTEN_SHORT_DATE')}
					</Suspense>
				</time>
			);
		},
	},
	{
		accessorKey: 'lastSeen',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Last seen
					<LuArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<time className='font-medium'>
					<Suspense fallback={null}>
						{formatDate(new Date(row.original.lastSeen), 'WRITTEN_SHORT_DATE_TIME')}
					</Suspense>
				</time>
			);
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			return <UserTableAction user={row.original} />;
		},
	},
];
