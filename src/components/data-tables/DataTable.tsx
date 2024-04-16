'use client';

import { useMemo, useState } from 'react';

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

import DataTableFilter from '@/components/data-tables/DataTableFilter';
import DataTablePagination from '@/components/data-tables/DataTablePagination';
import DataTableSearch from '@/components/data-tables/DataTableSearch';
import DataTableVisibility from '@/components/data-tables/DataTableVisibility';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	search?: keyof TData;
	filter?: {
		columnKey: string;
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

	const tableColumns = useMemo(() => columns, [columns]);
	const dataTable = useReactTable({
		data,
		columns: tableColumns,
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
			{(filter || search || visibility) && (
				<div className='flex items-center justify-center space-x-2 md:justify-between md:space-x-0'>
					{(search || visibility) && (
						<div className='flex items-center space-x-2 md:space-x-4'>
							{search && (
								<DataTableSearch
									dataTable={dataTable}
									search={search}
								/>
							)}

							{filter && dataTable.getColumn(filter.columnKey as string) && (
								<DataTableFilter
									column={dataTable.getColumn(filter.columnKey as string)}
									title={filter.title}
									options={filter.options}
								/>
							)}
						</div>
					)}
					{visibility && <DataTableVisibility dataTable={dataTable} />}
				</div>
			)}
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
