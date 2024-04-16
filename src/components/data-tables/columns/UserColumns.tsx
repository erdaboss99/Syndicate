'use client';

import Link from 'next/link';
import { Suspense } from 'react';

import { UserRole, type User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { LuArrowUpDown, LuInfo, LuPencil } from 'react-icons/lu';

import { formatDate } from '@/lib/date';

import { UserRoleBadge } from '@/components/general/CustomBadge';
import UserAvatar from '@/components/general/UserAvatar';
import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import ChangeRoleDropdown from '@/components/users/ChangeRoleDropdown';

type UserDataTableFields = Pick<User, 'id' | 'name' | 'email' | 'role' | 'emailVerified' | 'image'>;

export const UserColumns: ColumnDef<UserDataTableFields>[] = [
	{
		accessorKey: 'image',
		enableHiding: false,
		header: 'Avatar',
		cell: ({ row }) => {
			return <UserAvatar src={row.original.image} />;
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
					variant='outline'
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
		id: 'details',
		enableHiding: false,
		cell: ({ row }) => {
			return (
				<Button
					variant='ghost'
					className='h-8 w-8 p-0'
					asChild>
					<Link href={`/dashboard/manage-users/${row.original.id}`}>
						<span className='sr-only'>View details</span>
						<LuInfo className='h-4 w-4' />
					</Link>
				</Button>
			);
		},
	},
	{
		id: 'changeRole',
		enableHiding: false,
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='h-8 w-8 p-0'>
							<span className='sr-only'>Change user role</span>
							<LuPencil className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='start'>
						<ChangeRoleDropdown
							userId={row.original.id}
							userRole={row.original.role}
						/>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
