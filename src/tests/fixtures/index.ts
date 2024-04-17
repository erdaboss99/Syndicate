import { test as base, expect } from '@playwright/test';

import { BookingsPageObjectModel } from '@/tests/pages/BookingsPageObjectModel';
import { DashboardPageObjectModel } from '@/tests/pages/DashboardPageObjectModel';
import { DateSelectionPageObjectModel } from '@/tests/pages/DateSelectionPageObjectModel';
import { HomePageObjectModel } from '@/tests/pages/HomePageObjectModel';
import { LoginPageObjectModel } from '@/tests/pages/LoginPageObjectModel';
import { AppointmentSelectionPageObjectModel } from '../pages/AppointmentSelectionPageObjectModel';
import { BookAppointmentPageObjectModel } from '../pages/BookAppointmentPageObjectModel';

type BaseTestFixture = {
	userData: { email: string; password: string };
	homePage: HomePageObjectModel;
	loginPage: LoginPageObjectModel;
	dashboardPage: DashboardPageObjectModel;
	dateSelectionPage: DateSelectionPageObjectModel;
	appointmentSelectionPage: AppointmentSelectionPageObjectModel;
	bookAppointmentPage: BookAppointmentPageObjectModel;
	bookingsPage: BookingsPageObjectModel;
};

export const baseTestFixture = base.extend<BaseTestFixture>({
	userData: ({}, use) => {
		use({ email: process.env.TEST_USER_EMAIL!, password: process.env.TEST_USER_PASSWORD! });
	},
	homePage: async ({ page }, use) => {
		await use(new HomePageObjectModel(page));
	},
	loginPage: async ({ page }, use) => {
		await use(new LoginPageObjectModel(page));
	},
	dashboardPage: async ({ page }, use) => {
		await use(new DashboardPageObjectModel(page));
	},
	dateSelectionPage: async ({ page }, use) => {
		await use(new DateSelectionPageObjectModel(page));
	},
	appointmentSelectionPage: async ({ page }, use) => {
		await use(new AppointmentSelectionPageObjectModel(page));
	},
	bookAppointmentPage: async ({ page }, use) => {
		await use(new BookAppointmentPageObjectModel(page));
	},
	bookingsPage: async ({ page }, use) => {
		await use(new BookingsPageObjectModel(page));
	},
	page: async ({ page }, use) => {
		base.step('Check environment variables', () => {
			expect(process.env.BASE_URL).toBeDefined();
			expect(process.env.TEST_USER_EMAIL).toBeDefined();
			expect(process.env.TEST_USER_PASSWORD).toBeDefined();
		});

		await base.step('Navigate to the home page', async () => await page.goto('/'));

		await use(page);
	},
});
