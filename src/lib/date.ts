import { types } from 'util';

import { format } from 'date-fns-tz';
import { hu } from 'date-fns/locale';

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
	const options = { locale: hu, timeZone: 'Europe/Budapest' };
	switch (dateFormat) {
		case 'yyyy-MM-dd':
			return format(date, 'yyyy-MM-dd', options);
		case 'numericShortDay':
			return format(date, 'd', options);
		case 'longMonthAndYear':
			return format(date, 'MMMM yyyy', options);
		case 'onlyTime':
			return format(date, 'p', options);
		case 'writtenShortDate':
			return format(date, 'PPP', options);
		case 'writtenLongDate':
			return format(date, 'PPPP', options);
		case 'writtenShortDateTime':
			return format(date, 'PPp', options);
		case 'writtenLongDateTime':
			return format(date, 'PPPPp', options);
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
