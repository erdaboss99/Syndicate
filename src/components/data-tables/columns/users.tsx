'use client';

import { ColumnDef } from '@tanstack/react-table';

import { formatDate } from '@/lib/date';

import { UserRole, type User } from '@prisma/client';

import UserAvatar from '@/components/general/UserAvatar';
import UserRoleBadge from '@/components/general/UserBadge';
import { Button } from '@/components/ui/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { LuArrowUpDown, LuMoreHorizontal } from 'react-icons/lu';

type UserData = Pick<User, 'name' | 'email' | 'role' | 'emailVerified' | 'lastSeen' | 'image'>;

export const UserColumns: ColumnDef<UserData>[] = [
	{
		accessorKey: 'image',
		enableHiding: false,
		header: 'Avatar',
		cell: ({ row }) => {
			const user = row.original;

			return <UserAvatar src={user?.image!} />;
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
			const role = row.getValue('role') as UserRole;

			return <UserRoleBadge role={role} />;
		},
		filterFn: (row, _, id) => {
			return id.includes(row.getValue('role'));
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
			if (row.getValue('emailVerified') === null) return <div className='font-medium'>Not yet verified</div>;
			const date = new Date(row.getValue('emailVerified'));
			const formatted = formatDate(date, 'writtenShortDate');

			return <div className='font-medium'>{formatted}</div>;
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
			const date = new Date(row.getValue('lastSeen'));
			const formatted = formatDate(date, 'writtenShortDateTime');

			return <div className='font-medium'>{formatted}</div>;
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const user = row.original;

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
						<DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.email!)}>
							Copy user Email
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
