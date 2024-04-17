import { expect, test, type Page } from '@playwright/test';

import { PrettyLocator } from '@/tests/types';

type LoginPageElements = 'emailInput' | 'passwordInput' | 'loginSubmit';

export class LoginPageObjectModel {
	private readonly loginPageElementLocators: PrettyLocator<LoginPageElements[]>;
	constructor(page: Page) {
		this.loginPageElementLocators = {
			emailInput: {
				locator: page.getByTestId('login-email-input'),
				reportLocatorName: 'Email input',
			},
			passwordInput: {
				locator: page.getByTestId('login-password-input'),
				reportLocatorName: 'Password input',
			},
			loginSubmit: {
				locator: page.getByTestId('login-submit-button'),
				reportLocatorName: 'Login submit button',
			},
		};
	}

	public async isElementVisible(fieldType: keyof typeof this.loginPageElementLocators): Promise<void> {
		const field = this.loginPageElementLocators[fieldType];
		await expect(field.locator, `${field.reportLocatorName} should be visible`).toBeVisible();
	}

	public async clickElement(fieldType: keyof typeof this.loginPageElementLocators): Promise<void> {
		const field = this.loginPageElementLocators[fieldType];
		await test.step(`Click ${field.reportLocatorName}`, async () => await field.locator.click());
	}

	async fillElement(value: string, fieldType: keyof typeof this.loginPageElementLocators) {
		const field = this.loginPageElementLocators[fieldType];
		await test.step(`Fill ${field.reportLocatorName}`, async () => await field.locator.fill(value));
	}
}
