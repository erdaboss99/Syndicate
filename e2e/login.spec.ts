import { loginTestFixture as test } from '@/tests/fixtures';

test.describe('Login tests', () => {
	test('Testing login feature', async ({ homePage, loginPage, dashboardPage }) => {
		await homePage.isElementVisible('loginButton');
		await homePage.clickElement('loginButton');

		await loginPage.isElementVisible('emailInput');
		await loginPage.fillElement(process.env.USER_EMAIL!, 'emailInput');

		await loginPage.isElementVisible('passwordInput');
		await loginPage.fillElement(process.env.USER_PASSWORD!, 'passwordInput');

		await loginPage.isElementVisible('loginSubmit');
		await loginPage.clickElement('loginSubmit');

		await dashboardPage.dashboardPageLoaded();
	});
});
