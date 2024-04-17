import { expect, test, type Locator, type Page } from '@playwright/test';

export class LoginPageObjectModel {
	private readonly emailInput: Locator;
	private readonly passwordInput: Locator;
	private readonly loginSubmit: Locator;

	constructor(page: Page) {
		this.emailInput = page.getByTestId('login-email-input');
		this.passwordInput = page.getByTestId('login-password-input');
		this.loginSubmit = page.getByTestId('login-submit-button');
	}

	async emailInputIsVisible() {
		await expect(this.emailInput, 'Email input should be visible').toBeVisible();
	}

	async fillEmailInput(email: string) {
		await test.step('Fill on email input', async () => {
			await this.emailInput.fill(email);
		});
	}

	async passwordInputIsVisible() {
		await expect(this.passwordInput, 'Password input should be visible').toBeVisible();
	}

	async fillPasswordInput(email: string) {
		await test.step('Fill on password input', async () => {
			await this.passwordInput.fill(email);
		});
	}

	async loginSubmitButtonIsVisible() {
		await expect(this.loginSubmit, 'Login submit button should be visible').toBeVisible();
	}

	async clickLoginSubmitButton() {
		await test.step('Click on login submit button', async () => {
			await this.loginSubmit.click();
		});
	}
}
