import { type Table } from '@tanstack/react-table';
import { LuEye } from 'react-icons/lu';

import { Button } from '@/components/ui/Button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

type DataTableVisibilityProps<TData> = {
	dataTable: Table<TData>;
};

const DataTableVisibility = <TData,>({ dataTable }: DataTableVisibilityProps<TData>) => {
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

export default DataTableVisibility;
