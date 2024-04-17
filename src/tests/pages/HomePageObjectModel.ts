import { expect, test, type Page } from '@playwright/test';

import { PrettyLocator } from '@/tests/types';

type HomePageElements = 'loginButton';

export class HomePageObjectModel {
	private readonly page: Page;
	private readonly homePageElementLocators: PrettyLocator<HomePageElements[]>;

	constructor(page: Page) {
		this.page = page;
		this.homePageElementLocators = {
			loginButton: {
				locator: this.page.getByTestId('home-login-button'),
				reportLocatorName: 'Login button',
			},
		};
	}

	public async isElementVisible(fieldType: keyof typeof this.homePageElementLocators): Promise<void> {
		const field = this.homePageElementLocators[fieldType];
		await expect(field.locator, `${field.reportLocatorName} should be visible`).toBeVisible();
	}

	public async clickElement(fieldType: keyof typeof this.homePageElementLocators): Promise<void> {
		const field = this.homePageElementLocators[fieldType];
		await test.step(`Click ${field.reportLocatorName}`, async () => await field.locator.click());
	}
}
