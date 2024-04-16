/**
 * List of routes that are accessible to the public.
 * These routes do not require any form of authentication.
 */
export const publicRoutes: string[] = ['/', '/auth/email-verification'];

/**
 * List of routes that are used for authentication.
 * These routes will redirect logged in users to the home page.
 */
export const authRoutes: string[] = [
	'/auth/login',
	'/auth/registration',
	'/auth/error',
	'/auth/request-password-reset',
	'/auth/reset-password',
];

/**
 * This route is used for API authentication purposes.
 * This route is accessible to anyone at any time.
 */
export const authAPIRoute: string = '/api/auth';

/**
 * This route is the default route to redirect to after logging in or when trying to access auth routes while logged in.
 */
export const DEFAULT_AUTHENTICATED_REDIRECT: string = '/dashboard';

/**
 * This route is the default route to redirect to after logging out or when trying to access forbidden pages.
 */
export const DEFAULT_UNAUTHENTICATED_REDIRECT: string = '/auth/login';
