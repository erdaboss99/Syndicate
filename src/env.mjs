import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		POSTGRES_PRISMA_URL: z.string().url(),

		AUTH_SECRET: z.string().min(1),

		BASE_URL: z.string().url(),

		RESEND_API_KEY: z.string().min(1),
		EMAIL_FROM: z.string().min(1),
		REPORT_RECIPIENT: z.string().min(1),

		GH_CLIENT_ID: z.string().min(1),
		GH_CLIENT_SECRET: z.string().min(1),

		GOOGLE_CLIENT_ID: z.string().min(1),
		GOOGLE_CLIENT_SECRET: z.string().min(1),
	},
	runtimeEnv: process.env,
});
