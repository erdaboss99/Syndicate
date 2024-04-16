import { types } from 'util';

import { add, endOfDay, endOfWeek, startOfDay, startOfWeek } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { hu } from 'date-fns/locale';

import { APPOINTMENT_DURATION, DEFAULT_TIMEZONE } from '@/constants';

export const formatDate = (
	date: Date,
	dateFormat:
		| 'YYYY-MM-DD'
		| 'NUMERIC_SHORT_DAY'
		| 'LONG_MONTH_AND_YEAR'
		| 'SHORT_DATE_TIME'
		| 'ONLY_TIME'
		| 'WRITTEN_SHORT_DATE'
		| 'WRITTEN_LONG_DATE'
		| 'WRITTEN_SHORT_DATE_TIME'
		| 'WRITTEN_LONG_DATE_TIME'
		| 'WRITTEN_LONG_DATE_TIME_INTERVAL',
) => {
	switch (dateFormat) {
		case 'YYYY-MM-DD':
			return formatInTimeZone(date, DEFAULT_TIMEZONE, 'yyyy-MM-dd', { locale: hu });
		case 'NUMERIC_SHORT_DAY':
			return formatInTimeZone(date, DEFAULT_TIMEZONE, 'd', { locale: hu });
		case 'LONG_MONTH_AND_YEAR':
			return formatInTimeZone(date, DEFAULT_TIMEZONE, 'MMMM yyyy', { locale: hu });
		case 'SHORT_DATE_TIME':
			return formatInTimeZone(date, DEFAULT_TIMEZONE, 'Pp', { locale: hu });
		case 'ONLY_TIME':
			return formatInTimeZone(date, DEFAULT_TIMEZONE, 'p', { locale: hu });
		case 'WRITTEN_SHORT_DATE':
			return formatInTimeZone(date, DEFAULT_TIMEZONE, 'PPP', { locale: hu });
		case 'WRITTEN_LONG_DATE':
			return formatInTimeZone(date, DEFAULT_TIMEZONE, 'PPPP', { locale: hu });
		case 'WRITTEN_SHORT_DATE_TIME':
			return formatInTimeZone(date, DEFAULT_TIMEZONE, 'PPp', { locale: hu });
		case 'WRITTEN_LONG_DATE_TIME':
			return formatInTimeZone(date, DEFAULT_TIMEZONE, 'PPPPp', { locale: hu });
		case 'WRITTEN_LONG_DATE_TIME_INTERVAL':
			return `${formatInTimeZone(date, DEFAULT_TIMEZONE, 'PPPPp', { locale: hu })} - ${formatInTimeZone(
				add(date, { minutes: APPOINTMENT_DURATION }),
				DEFAULT_TIMEZONE,
				'p',
				{ locale: hu },
			)}`;
	}
};

export const isAppointmentExpired = (appointmentStart: Date) => {
	const currentDate = new Date();
	return add(appointmentStart, { minutes: APPOINTMENT_DURATION }) < currentDate;
};

export const isAppointmentCurrentlyInProgress = (appointmentStart: Date) => {
	const currentDate = new Date();
	return appointmentStart <= currentDate && add(appointmentStart, { minutes: APPOINTMENT_DURATION }) >= currentDate;
};

export const isAppointmentUpComing = (appointmentStart: Date) => {
	const currentDate = new Date();
	return appointmentStart > currentDate;
};

export const getIntervalFromDay = (date: Date) => {
	const start = startOfDay(date);
	const end = endOfDay(date);

	return { start, end };
};

export const getWeekIntervalFromDay = (date: Date) => {
	const start = startOfWeek(date, { locale: hu });
	const end = endOfWeek(date, { locale: hu });
	return { start, end };
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
