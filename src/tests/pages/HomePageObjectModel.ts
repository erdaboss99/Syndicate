import { expect, test, type Locator, type Page } from '@playwright/test';

export class HomePageObjectModel {
	private readonly loginButton: Locator;

	constructor(page: Page) {
		this.loginButton = page.getByTestId('home-login-button');
	}

	async loginButtonIsVisible() {
		await expect(this.loginButton, 'Login button should be visible').toBeVisible();
	}

	async clickLoginButton() {
		await test.step('Click on login button', async () => {
			await this.loginButton.click();
		});
	}
}
