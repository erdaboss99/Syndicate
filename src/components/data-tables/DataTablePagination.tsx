import { type Table } from '@tanstack/react-table';
import { LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight } from 'react-icons/lu';

import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

type DataTablePaginationProps<TData> = {
	dataTable: Table<TData>;
};

const DataTablePagination = <TData,>({ dataTable }: DataTablePaginationProps<TData>) => {
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

export default DataTablePagination;
