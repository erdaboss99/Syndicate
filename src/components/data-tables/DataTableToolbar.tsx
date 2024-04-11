import { type Table } from '@tanstack/react-table';

import DataTableFilter from '@/components/data-tables/DataTableFilter';
import DataTableSearch from '@/components/data-tables/DataTableSearch';
import DataTableVisibility from '@/components/data-tables/DataTableVisibility';

type DataTableToolbarProps<TData> = {
	dataTable: Table<TData>;
	search?: string;
	filter?: {
		columnKey: keyof TData;
		title?: string;
		options: {
			label: string;
			value: string;
		}[];
	};
	visibility?: boolean;
};

const DataTableToolbar = <TData,>({ dataTable, search, filter, visibility }: DataTableToolbarProps<TData>) => {
	if (!filter && !search && !visibility) return null;
	return (
		<div className='flex items-center justify-center space-x-2 md:justify-between md:space-x-0'>
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
			{visibility && <DataTableVisibility dataTable={dataTable} />}
		</div>
	);
};

export default DataTableToolbar;
