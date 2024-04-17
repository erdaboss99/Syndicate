import { dashboardTestFixture as test } from '@/tests/fixtures';

test.describe('Dashboard tests', () => {
	test.use({
		userData: {
			email: process.env.USER_EMAIL!,
			password: process.env.USER_PASSWORD!,
		},
	});

	test('Testing appointments tile navigation', async ({ dashboardPage, dateSelectionPage }) => {
		await dashboardPage.isElementVisible('appointmentsTile');
		await dashboardPage.clickElement('appointmentsTile');

		await dateSelectionPage.dateSelectionPageLoaded();
	});

	test('Testing bookings tile navigation', async ({ dashboardPage, bookingsPage }) => {
		await dashboardPage.isElementVisible('bookingsTile');
		await dashboardPage.clickElement('bookingsTile');

		await bookingsPage.bookingsPageLoaded();
	});
});
