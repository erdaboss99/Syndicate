'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { add, isWeekend } from 'date-fns';
import hu from 'date-fns/locale/hu';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { FURTHEST_APPOINTMENT_DATE } from '@/constants';
import { formatDate } from '@/lib/date';
import { cn } from '@/lib/utils';
import { DateSelectionFormSchema } from '@/schemas';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/Form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';

const DateSelectionForm = () => {
	const router = useRouter();

	const [calendarOpen, setCalendarOpen] = useState(false);

	const dateSelectionForm = useForm<z.infer<typeof DateSelectionFormSchema>>({
		resolver: zodResolver(DateSelectionFormSchema),
	});

	function onSubmit(data: z.infer<typeof DateSelectionFormSchema>) {
		const convertedDate = formatDate(data.selectedDate, 'YYYY-MM-DD');
		router.push(`/appointments/${convertedDate}`);
	}

	return (
		<Form {...dateSelectionForm}>
			<form
				onSubmit={dateSelectionForm.handleSubmit(onSubmit)}
				className='flex flex-col items-center justify-center space-y-6'>
				<FormField
					control={dateSelectionForm.control}
					name='selectedDate'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<Popover
								open={calendarOpen}
								onOpenChange={setCalendarOpen}>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'w-[270px] pl-3 text-left text-sm font-normal md:text-base',
												!field.value && 'text-muted-foreground',
											)}>
											{field.value ? (
												formatDate(field.value, 'WRITTEN_SHORT_DATE')
											) : (
												<span>Please select a date</span>
											)}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									className='flex w-auto flex-col items-center justify-center p-2'
									align='center'>
									<Calendar
										mode='single'
										selected={field.value}
										onSelect={(date) => {
											field.onChange(date);
											setCalendarOpen(false);
										}}
										disabled={(date) =>
											isWeekend(date) ||
											date < new Date() ||
											date > add(new Date(), { days: FURTHEST_APPOINTMENT_DATE })
										}
										initialFocus
										locale={hu}
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					size='lg'
					variant='default'
					type='submit'>
					Search
				</Button>
			</form>
		</Form>
	);
};

export default DateSelectionForm;
