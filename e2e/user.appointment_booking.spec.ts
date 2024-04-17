import { baseTestFixture as test } from '@/tests/fixtures';

test.describe('Appointment booking E2E test', () => {
	test('Testing appointment booking feature', async ({
		userData,
		homePage,
		loginPage,
		dashboardPage,
		dateSelectionPage,
		appointmentSelectionPage,
		bookAppointmentPage,
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

		await dashboardPage.isElementVisible('appointmentsTile');
		await dashboardPage.clickElement('appointmentsTile');

		await dateSelectionPage.dateSelectionPageLoaded();

		await dateSelectionPage.isElementVisible('openCalendar');
		await dateSelectionPage.clickElement('openCalendar');

		await dateSelectionPage.isElementVisible('lastAvailableDay');
		await dateSelectionPage.clickElement('lastAvailableDay');

		await dateSelectionPage.isElementVisible('searchAppointment');
		await dateSelectionPage.clickElement('searchAppointment');

		await appointmentSelectionPage.appointmentSelectionPageLoaded();

		await appointmentSelectionPage.isElementVisible('lastAppointment');
		await appointmentSelectionPage.clickElement('lastAppointment');

		await bookAppointmentPage.bookAppointmentPageLoaded();

		await bookAppointmentPage.isElementVisible('issueSelectTrigger');
		await bookAppointmentPage.clickElement('issueSelectTrigger');

		await bookAppointmentPage.isElementVisible('firstIssueSelectItem');
		await bookAppointmentPage.clickElement('firstIssueSelectItem');

		await bookAppointmentPage.isElementVisible('issueDescription');
		await bookAppointmentPage.fillElement(`PW_E2E_TEST_${new Date().toISOString()}`, 'issueDescription');

		await bookAppointmentPage.isElementVisible('bookAppointmentSubmit');
		await bookAppointmentPage.clickElement('bookAppointmentSubmit');

		await dashboardPage.dashboardPageLoaded();
	});
});
