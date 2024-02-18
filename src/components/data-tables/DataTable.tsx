'use client';

import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import DataTablePagination from '@/components/data-tables/DataTablePagination';
import DataTableToolbar from '@/components/data-tables/DataTableToolbar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';

type ColumnType<TData, TValue> = ColumnDef<TData, TValue>;

type DataTableProps<TData, TValue> = {
	columns: ColumnType<TData, TValue>[];
	data: TData[];
	search?: keyof TData;
	filter?: {
		columnKey: keyof TData;
		title?: string;
		options: {
			label: string;
			value: string;
		}[];
	};
	visibility?: boolean;
	pagination?: boolean;
};

const DataTable = <TData, TValue>({
	columns,
	data,
	search,
	filter,
	visibility,
	pagination,
}: DataTableProps<TData, TValue>) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const dataTable = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});
	return (
		<div className='w-full space-y-4 py-4'>
			<DataTableToolbar
				dataTable={dataTable}
				search={search}
				filter={filter}
				visibility={visibility}
			/>

			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{dataTable.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{dataTable.getRowModel().rows?.length ? (
							dataTable.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{pagination && <DataTablePagination dataTable={dataTable} />}
		</div>
	);
};

export default DataTable;
