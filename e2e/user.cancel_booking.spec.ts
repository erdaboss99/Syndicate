import { baseTestFixture as test } from '@/tests/fixtures';

test.describe('Booking cancellation E2E test', () => {
	test('Testing booking cancellation feature', async ({
		userData,
		homePage,
		loginPage,
		dashboardPage,
		bookingsPage,
	}) => {
		await homePage.isElementVisible('loginButton');
		await homePage.clickElement('loginButton');

		await loginPage.isElementVisible('emailInput');
		await loginPage.fillElement(userData.email, 'emailInput');

		await loginPage.isElementVisible('passwordInput');
		await loginPage.fillElement(userData.password, 'passwordInput');

		await loginPage.isElementVisible('loginSubmit');
		await loginPage.clickElement('loginSubmit');

		await dashboardPage.dashboardPageLoaded();

		await dashboardPage.isElementVisible('bookingsTile');
		await dashboardPage.clickElement('bookingsTile');

		await bookingsPage.bookingsPageLoaded();

		await bookingsPage.isElementVisible('appointment');
		await bookingsPage.isElementVisible('description');
		await bookingsPage.isElementVisible('createdAt');
		await bookingsPage.isElementVisible('issueName');
		await bookingsPage.isElementVisible('issueDescription');

		await bookingsPage.isElementVisible('cancelModalTrigger');
		await bookingsPage.clickElement('cancelModalTrigger');

		await bookingsPage.isElementVisible('cancelSubmit');
		await bookingsPage.clickElement('cancelSubmit');

		await dashboardPage.dashboardPageLoaded();
	});
});
