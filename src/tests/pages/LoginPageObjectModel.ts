import { expect, test, type Page } from '@playwright/test';

import { SiteHandler } from '@/tests/handlers/SiteHandler';
import { PrettyLocator } from '@/tests/types';

type LoginPageElements = 'emailInput' | 'passwordInput' | 'loginSubmit';

export class LoginPageObjectModel {
	private readonly page: Page;
	private readonly loginPageElementLocators: PrettyLocator<LoginPageElements[]>;

	private readonly siteHandler: SiteHandler;

	constructor(page: Page) {
		this.page = page;
		this.loginPageElementLocators = {
			emailInput: {
				locator: this.page.getByTestId('login-email-input'),
				reportLocatorName: 'Email input',
			},
			passwordInput: {
				locator: this.page.getByTestId('login-password-input'),
				reportLocatorName: 'Password input',
			},
			loginSubmit: {
				locator: this.page.getByTestId('login-submit-button'),
				reportLocatorName: 'Login button',
			},
		};

		this.siteHandler = new SiteHandler(page);
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

	public async loginPageLoaded(): Promise<void> {
		await this.siteHandler.pageLoaded(/auth\/login/, 'login');
	}
}
