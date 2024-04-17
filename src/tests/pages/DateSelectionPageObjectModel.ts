import { expect, test, type Page } from '@playwright/test';

import { SiteHandler } from '@/tests/handlers/SiteHandler';
import { PrettyLocator } from '@/tests/types';

type DateSelectionPageElements = 'openCalendar' | 'searchAppointment' | 'lastAvailableDay';

export class DateSelectionPageObjectModel {
	private readonly page: Page;
	private readonly dateSelectionPageElementLocators: PrettyLocator<DateSelectionPageElements[]>;

	private readonly siteHandler: SiteHandler;

	constructor(page: Page) {
		this.page = page;
		this.dateSelectionPageElementLocators = {
			openCalendar: {
				locator: this.page.getByTestId('date-selection-open-calendar-button'),
				reportLocatorName: 'Open calendar',
			},
			searchAppointment: {
				locator: this.page.getByTestId('date-selection-submit-button'),
				reportLocatorName: 'Search appointment',
			},
			lastAvailableDay: {
				locator: this.page.getByTestId('calendar-available-day').last(),
				reportLocatorName: 'Last available day',
			},
		};

		this.siteHandler = new SiteHandler(page);
	}

	public async isElementVisible(fieldType: keyof typeof this.dateSelectionPageElementLocators): Promise<void> {
		const field = this.dateSelectionPageElementLocators[fieldType];
		await expect(field.locator, `${field.reportLocatorName} should be visible`).toBeVisible();
	}

	public async clickElement(fieldType: keyof typeof this.dateSelectionPageElementLocators): Promise<void> {
		const field = this.dateSelectionPageElementLocators[fieldType];
		await test.step(`Click ${field.reportLocatorName}`, async () => await field.locator.click());
	}

	public async dateSelectionPageLoaded(): Promise<void> {
		await this.siteHandler.pageLoaded(/appointments/, 'date selection');
	}
}
