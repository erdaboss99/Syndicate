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
		navigationTimeout: 20 * 1000,
	},

	expect: {
		timeout: 20 * 1000,
	},

	projects: [
		{ name: 'Setup', testMatch: /.*\.setup\.ts/, teardown: 'Teardown' },
		{
			name: 'Chromium',
			use: {
				...devices['Desktop Chrome'],
			},
			dependencies: ['Setup'],
		},
		{
			name: 'Firefox',
			use: {
				...devices['Desktop Firefox'],
			},
			dependencies: ['Setup'],
		},
		{
			name: 'Safari',
			use: {
				...devices['Desktop Safari'],
			},
			dependencies: ['Setup'],
		},
		{
			name: 'iPhone 13 Pro Max',
			use: {
				...devices['iPhone 13 Pro Max'],
			},
			dependencies: ['Setup'],
		},
		{
			name: 'Pixel 7',
			use: {
				...devices['Pixel 7'],
			},
			dependencies: ['Setup'],
		},

		{ name: 'Teardown', testMatch: /.*\.teardown\.ts/ },
	],
});
