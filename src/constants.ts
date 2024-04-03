export const EMAIL_VERIFICATION_TOKEN_EXPIRY = 10; // in minutes

export const PASSWORD_RESET_TOKEN_EXPIRY = 5; // in minutes

export const JWT_TOKEN_EXPIRY = 1; // in days

export const ACTION_REDIRECT_DELAY = 2500; // in milliseconds

export const AUTO_APPOINTMENT_GENERATION_KEY = 'AUTO_APPOINTMENT_GENERATION';
export const AUTO_APPOINTMENT_GENERATION_DEFAULT_VALUE = 0; // 0 = off, 1 = on

export const OPENING_HOUR = 9; // in UTC time ( 9 UTC is 10 Budapest )

export const CLOSING_HOUR = 13; // in UTC time ( 13 UTC is 14 Budapest )

export const APPOINTMENT_DURATION = 30; // in minutes

export const FURTHEST_APPOINTMENT_DATE = 5; // in days

// API related constants
export const API_ONLY_AUTHENTICATED_ERROR_MESSAGE = 'This feature is only available for authenticated users!';
export const API_FORBIDDEN_ONLY_ADMIN_ROUTE_ERROR_MESSAGE =
	'This feature is only available for  users with admin role!';
export const API_FORBIDDEN_ERROR_CODE = 403;
export const API_AUTHENTICATION_ERROR_CODE = 401;
export const API_SUCCESSFUL_MODIFICATION_CODE = 201;
export const API_SUCCESSFUL_REQUEST_CODE = 200;
