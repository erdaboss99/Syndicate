import NextAuth from 'next-auth';

import authConfig from '@/auth/auth.config';
import {
	DEFAULT_LOGIN_REDIRECT,
	DEFAULT_UNAUTHENTICATED_REDIRECT,
	authAPIRoute,
	authRoutes,
	publicRoutes,
} from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const { nextUrl } = req;
	const isActiveSession = !!req.auth;
	const isAuthAPIRoute = nextUrl.pathname.startsWith(authAPIRoute);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

	if (isAuthAPIRoute) return null;

	if (isAuthRoute) {
		if (isActiveSession) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		return null;
	}

	if (!isActiveSession && !isPublicRoute)
		return Response.redirect(new URL(DEFAULT_UNAUTHENTICATED_REDIRECT, nextUrl));

	return null;
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
