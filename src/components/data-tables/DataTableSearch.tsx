import { type Table } from '@tanstack/react-table';

import { Input } from '@/components/ui/Input';

type DataTableSearchProps<TData> = {
	dataTable: Table<TData>;
	search: keyof TData;
};

const DataTableSearch = <TData,>({ dataTable, search }: DataTableSearchProps<TData>) => {
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

export default DataTableSearch;
