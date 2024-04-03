import { types } from 'util';

import { formatInTimeZone } from 'date-fns-tz';
import { hu } from 'date-fns/locale';

import { DEFAULT_TIMEZONE } from '@/constants';

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
			return formatInTimeZone(date, DEFAULT_TIMEZONE, 'yyyy-MM-dd', { locale: hu });
		case 'numericShortDay':
			return formatInTimeZone(date, DEFAULT_TIMEZONE, 'd', { locale: hu });
		case 'longMonthAndYear':
			return formatInTimeZone(date, DEFAULT_TIMEZONE, 'MMMM yyyy', { locale: hu });
		case 'onlyTime':
			return formatInTimeZone(date, DEFAULT_TIMEZONE, 'p', { locale: hu });
		case 'writtenShortDate':
			return formatInTimeZone(date, DEFAULT_TIMEZONE, 'PPP', { locale: hu });
		case 'writtenLongDate':
			return formatInTimeZone(date, DEFAULT_TIMEZONE, 'PPPP', { locale: hu });
		case 'writtenShortDateTime':
			return formatInTimeZone(date, DEFAULT_TIMEZONE, 'PPp', { locale: hu });
		case 'writtenLongDateTime':
			return formatInTimeZone(date, DEFAULT_TIMEZONE, 'PPPPp', { locale: hu });
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
