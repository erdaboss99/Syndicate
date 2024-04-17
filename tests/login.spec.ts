import { baseTestFixture as test } from '@/tests/fixtures';
import { DashboardPageObjectModel } from '@/tests/pages/DashboardPageObjectModel';
import { HomePageObjectModel } from '@/tests/pages/HomePageObjectModel';
import { LoginPageObjectModel } from '@/tests/pages/LoginPageObjectModel';

test.describe('Login tests', () => {
	test('Login Test as User', async ({ page }) => {
		const homePage = new HomePageObjectModel(page);

		await homePage.isElementVisible('loginButton');
		await homePage.clickElement('loginButton');

		const loginPage = new LoginPageObjectModel(page);

		await loginPage.isElementVisible('emailInput');
		await loginPage.fillElement(process.env.USER_EMAIL!, 'emailInput');

		await loginPage.isElementVisible('passwordInput');
		await loginPage.fillElement(process.env.USER_PASSWORD!, 'passwordInput');

		await loginPage.isElementVisible('loginSubmit');
		await loginPage.clickElement('loginSubmit');

		await test.step('Wait for the dashboard page to load', async () => {
			await page.waitForURL(/dashboard/);
			await page.waitForLoadState('networkidle');
		});

		const dashboardPage = new DashboardPageObjectModel(page);

		await dashboardPage.isElementVisible('appointmentsTile');
		await dashboardPage.isElementVisible('bookingsTile');
		await dashboardPage.clickElement('appointmentsTile');

		await page.waitForURL(/appointments/);
	});
});
