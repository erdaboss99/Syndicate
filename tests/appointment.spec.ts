import { loginTestFixture as test } from '@/tests/fixtures';
import { DashboardPageObjectModel } from '@/tests/pages/DashboardPageObjectModel';

test.describe('Appointment page', () => {
	test.use({
		userData: {
			email: process.env.USER_EMAIL!,
			password: process.env.USER_PASSWORD!,
		},
	});

	test('Appointment page load', async ({ page }) => {
		const dashboardPage = new DashboardPageObjectModel(page);

		await dashboardPage.isElementVisible('appointmentsTile');
		await dashboardPage.isElementVisible('bookingsTile');
		await dashboardPage.clickElement('appointmentsTile');

		await page.waitForURL(/appointments/);
		await page.waitForLoadState('networkidle');
	});
});
