/**
 * List of routes that are accessible to the public.
 * These routes do not require any form of authentication.
 */
export const publicRoutes: string[] = ['/', '/auth/new-verification'];

/**
 * List of routes that are used for authentication.
 * These routes will redirect logged in users to the home page.
 */
export const authRoutes: string[] = [
	'/auth/login',
	'/auth/registration',
	'/auth/error',
	'/auth/request-password-reset',
];

/**
 * This route is used for API authentication purposes.
 * This route is accessible to anyone at any time.
 */
export const authAPIRoute: string = '/api/auth';

/**
 * This route is the default route to redirect to after logging in.
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/';
