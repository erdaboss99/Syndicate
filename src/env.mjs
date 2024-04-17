import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		POSTGRES_PRISMA_URL: z.string().url(),

		AUTH_SECRET: z.string().min(1),
		BASE_URL: z.string().url(),

		REPORT_RECIPIENT: z.string().min(1),

		MAIL_FROM: z.string().min(1),
		MAIL_SERVICE: z.string().min(1),
		MAIL_USER: z.string().min(1),
		MAIL_PASSWORD: z.string().min(1),

		GH_CLIENT_ID: z.string().min(1),
		GH_CLIENT_SECRET: z.string().min(1),

		GOOGLE_CLIENT_ID: z.string().min(1),
		GOOGLE_CLIENT_SECRET: z.string().min(1),
	},
	runtimeEnv: process.env,
});
