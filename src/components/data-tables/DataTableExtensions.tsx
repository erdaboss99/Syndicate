import { type Column, type Table } from '@tanstack/react-table';
import { LuCheck, LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight, LuEye, LuPlus } from 'react-icons/lu';

import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/Command';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Input } from '@/components/ui/Input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Separator } from '@/components/ui/Separator';

type BaseDataTableExtensionProps<TData> = {
	dataTable: Table<TData>;
};

type DataTableSearchProps<TData> = {
	search: keyof TData;
} & BaseDataTableExtensionProps<TData>;

type DataTableFilterProps<TData, TValue> = {
	column?: Column<TData, TValue>;
	title?: string;
	options: {
		label: string;
		value: string;
	}[];
};

export const DataTableSearch = <TData,>({ dataTable, search }: DataTableSearchProps<TData>) => {
	return (
		<div className='flex items-center'>
			<Input
				placeholder={`Search by ${search as string}...`}
				value={(dataTable.getColumn(search as string)?.getFilterValue() as string) ?? ''}
				onChange={(event) => dataTable.getColumn(search as string)?.setFilterValue(event.target.value)}
				className='max-w-sm'
			/>
		</div>
	);
};

export const DataTableFilter = <TData, TValue>({ column, title, options }: DataTableFilterProps<TData, TValue>) => {
	const facets = column?.getFacetedUniqueValues();
	const selectedValues = new Set(column?.getFilterValue() as string[]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					size='sm'
					className='h-9 border'>
					<LuPlus className='mr-2 hidden h-4 w-4 md:block' />
					{title}
					{selectedValues?.size > 0 && (
						<>
							<Separator
								orientation='vertical'
								className='mx-2 h-4'
							/>
							<Badge
								variant='secondary'
								className='rounded-sm px-1 font-normal lg:hidden'>
								{selectedValues.size}
							</Badge>
							<div className='hidden space-x-1 lg:flex'>
								{selectedValues.size > 2 ? (
									<Badge
										variant='secondary'
										className='rounded-sm px-1 font-normal'>
										{selectedValues.size} selected
									</Badge>
								) : (
									options
										.filter((option) => selectedValues.has(option.value))
										.map((option) => (
											<Badge
												variant='default'
												key={option.value}
												className='rounded-sm font-normal'>
												{option.label}
											</Badge>
										))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='w-[200px] p-0'
				align='start'>
				<Command>
					<CommandInput placeholder={title} />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = selectedValues.has(option.value);
								return (
									<CommandItem
										key={option.value}
										onSelect={() => {
											if (isSelected) {
												selectedValues.delete(option.value);
											} else {
												selectedValues.add(option.value);
											}
											const filterValues = Array.from(selectedValues);
											column?.setFilterValue(filterValues.length ? filterValues : undefined);
										}}>
										<div
											className={cn(
												'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
												isSelected
													? 'bg-primary text-primary-foreground'
													: 'opacity-50 [&_svg]:invisible',
											)}>
											<LuCheck className={cn('h-4 w-4')} />
										</div>
										<span>{option.label}</span>
										{facets?.get(option.value) && (
											<span className='ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs'>
												{facets.get(option.value)}
											</span>
										)}
									</CommandItem>
								);
							})}
						</CommandGroup>
						{selectedValues.size > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() => column?.setFilterValue(undefined)}
										className='justify-center text-center'>
										Clear filters
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export const DataTablePagination = <TData,>({ dataTable }: BaseDataTableExtensionProps<TData>) => {
	return (
		<div className='flex items-center justify-between space-x-6 md:space-x-8'>
			<div className='flex w-[100px] items-center justify-center text-sm font-medium'>
				Page {dataTable.getState().pagination.pageIndex + 1} of {dataTable.getPageCount()}
			</div>
			<div className='flex items-center space-x-8'>
				<div className='flex items-center space-x-2'>
					<p className='text-sm font-medium'>Rows per page</p>
					<Select
						value={`${dataTable.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							dataTable.setPageSize(Number(value));
						}}>
						<SelectTrigger className='h-8 w-[70px]'>
							<SelectValue placeholder={dataTable.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side='top'>
							{[5, 10, 20, 50, 100].map((pageSize) => (
								<SelectItem
									key={pageSize}
									value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='flex items-center space-x-2'>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 md:flex'
						onClick={() => dataTable.setPageIndex(0)}
						disabled={!dataTable.getCanPreviousPage()}>
						<span className='sr-only'>Go to first page</span>
						<LuChevronsLeft className='h-4 w-4' />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0'
						onClick={() => dataTable.previousPage()}
						disabled={!dataTable.getCanPreviousPage()}>
						<span className='sr-only'>Go to previous page</span>
						<LuChevronLeft className='h-4 w-4' />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0'
						onClick={() => dataTable.nextPage()}
						disabled={!dataTable.getCanNextPage()}>
						<span className='sr-only'>Go to next page</span>
						<LuChevronRight className='h-4 w-4' />
					</Button>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex'
						onClick={() => dataTable.setPageIndex(dataTable.getPageCount() - 1)}
						disabled={!dataTable.getCanNextPage()}>
						<span className='sr-only'>Go to last page</span>
						<LuChevronsRight className='h-4 w-4' />
					</Button>
				</div>
			</div>
		</div>
	);
};

export const DataTableVisibility = <TData,>({ dataTable }: BaseDataTableExtensionProps<TData>) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					size='sm'
					className='h-9 border md:ml-auto'>
					<LuEye className='mr-2 hidden h-4 w-4 md:block' />
					Columns visibility
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{dataTable
					.getAllColumns()
					.filter((column) => column.getCanHide())
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className='capitalize'
								checked={column.getIsVisible()}
								onCheckedChange={(value) => column.toggleVisibility(!!value)}>
								{column.id}
							</DropdownMenuCheckboxItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
