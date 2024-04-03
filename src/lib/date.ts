import { types } from 'util';

import { format } from 'date-fns';
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
	switch (dateFormat) {
		case 'yyyy-MM-dd':
			return format(date, 'yyyy-MM-dd', { locale: hu });
		case 'numericShortDay':
			return format(date, 'd', { locale: hu });
		case 'longMonthAndYear':
			return format(date, 'MMMM yyyy', { locale: hu });
		case 'onlyTime':
			return format(date, 'p', { locale: hu });
		case 'writtenShortDate':
			return format(date, 'PPP', { locale: hu });
		case 'writtenLongDate':
			return format(date, 'PPPP', { locale: hu });
		case 'writtenShortDateTime':
			return format(date, 'PPp', { locale: hu });
		case 'writtenLongDateTime':
			return format(date, 'PPPPp', { locale: hu });
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
