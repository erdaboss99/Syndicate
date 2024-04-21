import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 0 : 0,
	workers: process.env.CI ? 1 : 1,
	reporter: 'html',
	use: {
		trace: 'retain-on-failure',
		video: 'retain-on-failure',
		baseURL: process.env.BASE_URL,
	},

	projects: [
		{
			name: 'Desktop Chrome',
			use: {
				...devices['Desktop Chrome'],
			},
			testMatch: /.*\.e2e\.spec\.ts/,
		},
		// {
		// 	name: 'Desktop Firefox',
		// 	use: {
		// 		...devices['Desktop Firefox'],
		// 	},
		// 	testMatch: /.*\.e2e\.spec\.ts/,
		// },
		// {
		// 	name: 'Desktop Safari',
		// 	use: {
		// 		...devices['Desktop Safari'],
		// 	},
		// 	testMatch: /.*\.e2e\.spec\.ts/,
		// },
		{
			name: 'iPhone 13 Pro Max',
			use: {
				...devices['iPhone 13 Pro Max'],
			},
			testMatch: /.*\.e2e\.spec\.ts/,
		},
		// {
		// 	name: 'Galaxy S9+',
		// 	use: {
		// 		...devices['Galaxy S9+'],
		// 	},
		// 	testMatch: /.*\.e2e\.spec\.ts/,
		// },
	],
});
