import { expect, test, type Page } from '@playwright/test';

import { SiteHandler } from '@/tests/handlers/SiteHandler';
import { PrettyLocator } from '@/tests/types';

type AppointmentSelectionPageElements = 'lastAppointment';

export class AppointmentSelectionPageObjectModel {
	private readonly page: Page;
	private readonly appointmentSelectionPageElementLocators: PrettyLocator<AppointmentSelectionPageElements[]>;

	private readonly siteHandler: SiteHandler;

	constructor(page: Page) {
		this.page = page;
		this.appointmentSelectionPageElementLocators = {
			lastAppointment: {
				locator: this.page.getByTestId('appointment-select-button').last(),
				reportLocatorName: 'Last available appointment',
			},
		};

		this.siteHandler = new SiteHandler(page);
	}

	public async isElementVisible(fieldType: keyof typeof this.appointmentSelectionPageElementLocators): Promise<void> {
		const field = this.appointmentSelectionPageElementLocators[fieldType];
		await expect(field.locator, `${field.reportLocatorName} should be visible`).toBeVisible();
	}

	public async clickElement(fieldType: keyof typeof this.appointmentSelectionPageElementLocators): Promise<void> {
		const field = this.appointmentSelectionPageElementLocators[fieldType];
		await test.step(`Click ${field.reportLocatorName}`, async () => await field.locator.click());
	}

	public async appointmentSelectionPageLoaded(): Promise<void> {
		await this.siteHandler.pageLoaded(/appointments\/\d{4}-\d{2}-\d{2}/, 'appointment selection');
	}
}
