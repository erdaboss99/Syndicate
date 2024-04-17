import { expect, test } from '@playwright/test';

import { HomePageObjectModel } from '@/tests/pages/HomePageObjectModel';
import { LoginPageObjectModel } from '@/tests/pages/LoginPageObjectModel';

test.beforeEach(async ({ page }) => {
	await page.goto(process.env.BASE_URL!);
});

test('Login Test as User', async ({ page }) => {
	const homePage = new HomePageObjectModel(page);

	await homePage.loginButtonIsVisible();
	await homePage.clickLoginButton();

	const loginPage = new LoginPageObjectModel(page);

	await loginPage.emailInputIsVisible();
	await loginPage.fillEmailInput(process.env.USER_EMAIL!);

	await loginPage.passwordInputIsVisible();
	await loginPage.fillPasswordInput(process.env.USER_PASSWORD!);

	await loginPage.loginSubmitButtonIsVisible();
	await loginPage.clickLoginSubmitButton();

	await expect(page).toHaveURL(/dashboard/);
});

test('Login Test as Admin', async ({ page }) => {
	const homePage = new HomePageObjectModel(page);

	await homePage.loginButtonIsVisible();
	await homePage.clickLoginButton();

	const loginPage = new LoginPageObjectModel(page);

	await loginPage.emailInputIsVisible();
	await loginPage.fillEmailInput(process.env.ADMIN_EMAIL!);

	await loginPage.passwordInputIsVisible();
	await loginPage.fillPasswordInput(process.env.ADMIN_PASSWORD!);

	await loginPage.loginSubmitButtonIsVisible();
	await loginPage.clickLoginSubmitButton();

	await expect(page).toHaveURL(/dashboard/);
});
