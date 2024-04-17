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
			name: 'Appointment Booking',
			use: {
				...devices['Desktop Chrome'],
			},
			testMatch: /.*\.appointment_booking\.spec\.ts/,
			teardown: 'Delete Booking',
		},
		{
			name: 'Delete Booking',
			use: {
				...devices['Desktop Chrome'],
			},
			testMatch: /.*\.cancel_booking\.spec\.ts/,
		},
	],
});
