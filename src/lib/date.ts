import { types } from 'util';

import { format } from 'date-fns';

export const formatDate = (
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
) => {
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
};

export const formatDatesInObject = (object: any): any => {
	for (let key in object) {
		if (object.hasOwnProperty(key)) {
			if (types.isDate(object[key])) {
				object[key] = object[key].toISOString();
			} else if (typeof object[key] === 'object' && object[key] !== null) {
				formatDatesInObject(object[key]);
			}
		}
	}
	return object;
};
