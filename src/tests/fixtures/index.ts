import { test as base, expect } from '@playwright/test';

import { BookingsPageObjectModel } from '@/tests/pages/BookingsPageObjectModel';
import { DashboardPageObjectModel } from '@/tests/pages/DashboardPageObjectModel';
import { DateSelectionPageObjectModel } from '@/tests/pages/DateSelectionPageObjectModel';
import { HomePageObjectModel } from '@/tests/pages/HomePageObjectModel';
import { LoginPageObjectModel } from '@/tests/pages/LoginPageObjectModel';

export const baseTestFixture = base.extend({
	page: async ({ page }, use) => {
		base.step('Check environment variables', () => {
			expect(process.env.BASE_URL).toBeDefined();
			expect(process.env.USER_EMAIL).toBeDefined();
			expect(process.env.USER_PASSWORD).toBeDefined();
		});

		await base.step('Navigate to the home page', async () => await page.goto('/'));

		await use(page);
	},
});

type LoginTestFixture = {
	homePage: HomePageObjectModel;
	loginPage: LoginPageObjectModel;
	dashboardPage: DashboardPageObjectModel;
	userData?: {
		email: string;
		password: string;
	};
};

export const loginTestFixture = baseTestFixture.extend<LoginTestFixture>({
	userData: [undefined, { option: true }],
	homePage: async ({ page }, use) => {
		const homePage = new HomePageObjectModel(page);
		await use(homePage);
	},
	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPageObjectModel(page);
		await use(loginPage);
	},
	dashboardPage: async ({ page }, use) => {
		const dashboardPage = new DashboardPageObjectModel(page);
		await use(dashboardPage);
	},
	page: async ({ page, userData }, use) => {
		if (userData)
			await baseTestFixture.step('Process login', async () => {
				const homePage = new HomePageObjectModel(page);
				await baseTestFixture.step('Go to login page', async () => {
					await homePage.clickElement('loginButton');
				});

				const loginPage = new LoginPageObjectModel(page);
				await loginPage.fillElement(process.env.USER_EMAIL!, 'emailInput');
				await loginPage.fillElement(process.env.USER_PASSWORD!, 'passwordInput');
				await loginPage.clickElement('loginSubmit');

				const dashboardPage = new DashboardPageObjectModel(page);
				await dashboardPage.dashboardPageLoaded();
			});

		await use(page);
	},
});

type DashboardTestFixture = {
	dateSelectionPage: DateSelectionPageObjectModel;
	bookingsPage: BookingsPageObjectModel;
};

export const dashboardTestFixture = loginTestFixture.extend<DashboardTestFixture>({
	dateSelectionPage: async ({ page }, use) => {
		const dateSelectionPage = new DateSelectionPageObjectModel(page);
		await use(dateSelectionPage);
	},
	bookingsPage: async ({ page }, use) => {
		const bookingsPage = new BookingsPageObjectModel(page);
		await use(bookingsPage);
	},

	userData: ({ userData }, use) => {
		if (!userData) throw new Error('User data is required for this test');

		use(userData);
	},
});
