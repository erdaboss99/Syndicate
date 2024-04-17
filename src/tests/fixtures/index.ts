import { test as base, expect } from '@playwright/test';

import { HomePageObjectModel } from '@/tests/pages/HomePageObjectModel';
import { LoginPageObjectModel } from '@/tests/pages/LoginPageObjectModel';

export const baseTestFixture = base.extend({
	page: async ({ page }, use) => {
		base.step('Check environment variables', () => {
			expect(process.env.BASE_URL).toBeDefined();
			expect(process.env.USER_EMAIL).toBeDefined();
			expect(process.env.USER_PASSWORD).toBeDefined();
		});

		await base.step('Navigate to the home page', async () => await page.goto(process.env.BASE_URL!));

		await baseTestFixture.step(
			'Wait for the dashboard page to load',
			async () => await page.waitForLoadState('networkidle'),
		);

		await use(page);
	},
});

type LoginTestFixtureOptions = {
	userData?: {
		email: string;
		password: string;
	};
};

export const loginTestFixture = baseTestFixture.extend<LoginTestFixtureOptions>({
	userData: [undefined, { option: true }],
	page: async ({ page, userData }, use) => {
		if (userData)
			await baseTestFixture.step('Process login', async () => {
				await baseTestFixture.step('Go to login page', async () => {
					const homePage = new HomePageObjectModel(page);
					await homePage.clickElement('loginButton');
				});

				await baseTestFixture.step('Wait for the login page to load', async () => {
					await page.waitForURL(/login/);
					await page.waitForLoadState('networkidle');
				});

				const loginPage = new LoginPageObjectModel(page);
				await loginPage.fillElement(process.env.USER_EMAIL!, 'emailInput');
				await loginPage.fillElement(process.env.USER_PASSWORD!, 'passwordInput');
				await loginPage.clickElement('loginSubmit');

				await baseTestFixture.step('Wait for the dashboard page to load', async () => {
					await page.waitForURL(/dashboard/);
					await page.waitForLoadState('networkidle');
				});
			});

		await use(page);
	},
});
