import { format } from 'date-fns';
export function formatDate(
	date: Date,
	dateFormat:
		| 'yyyy-MM-dd'
		| 'numericShortDay'
		| 'longMonthAndYear'
		| 'onlyTime'
		| 'writtenShortDate'
		| 'writtenLongDate'
		| 'writtenShortDateTime'
		| 'writtenLongDateTime',
) {
	switch (dateFormat) {
		case 'yyyy-MM-dd':
			return format(date, dateFormat);
		case 'numericShortDay':
			return format(date, 'd');
		case 'longMonthAndYear':
			return format(date, 'MMMM yyyy');
		case 'onlyTime':
			return format(date, 'p');
		case 'writtenShortDate':
			return format(date, 'PPP');
		case 'writtenLongDate':
			return format(date, 'PPPP');
		case 'writtenShortDateTime':
			return format(date, 'PPp');
		case 'writtenLongDateTime':
			return format(date, 'PPPPp');
	}
}
