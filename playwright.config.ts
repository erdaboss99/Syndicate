import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 1,
	workers: process.env.CI ? 1 : 1,
	reporter: 'html',
	use: {
		trace: 'retain-on-failure',
		video: 'retain-on-failure',
		baseURL: process.env.BASE_URL,
	},

	projects: [
		{
			name: 'Chromium',
			use: {
				...devices['Desktop Chrome'],
			},
		},
		{
			name: 'Firefox',
			use: {
				...devices['Desktop Firefox'],
			},
		},
		{
			name: 'Safari',
			use: {
				...devices['Desktop Safari'],
			},
		},
		{
			name: 'iPhone 13 Pro Max',
			use: {
				...devices['iPhone 13 Pro Max'],
			},
		},
		{
			name: 'Pixel 7',
			use: {
				...devices['Pixel 7'],
			},
		},
	],
});
