import { expect, test, type Page } from '@playwright/test';

import { SiteHandler } from '@/tests/handlers/SiteHandler';
import { PrettyLocator } from '@/tests/types';

type BookingsPageElements =
	| 'appointment'
	| 'description'
	| 'createdAt'
	| 'issueName'
	| 'issueDescription'
	| 'cancelModalTrigger'
	| 'cancelSubmit';

export class BookingsPageObjectModel {
	private readonly page: Page;
	private readonly bookingsPageElementLocators: PrettyLocator<BookingsPageElements[]>;

	private readonly siteHandler: SiteHandler;

	constructor(page: Page) {
		this.page = page;
		this.bookingsPageElementLocators = {
			appointment: {
				locator: this.page.getByTestId('booking-appointment'),
				reportLocatorName: 'Booking appointment field',
			},
			description: {
				locator: this.page.getByTestId('booking-description'),
				reportLocatorName: 'Booking description field',
			},
			createdAt: {
				locator: this.page.getByTestId('booking-created-at'),
				reportLocatorName: 'Booking created at field',
			},
			issueName: {
				locator: this.page.getByTestId('booking-issue-name'),
				reportLocatorName: 'Booking issue name field',
			},
			issueDescription: {
				locator: this.page.getByTestId('booking-issue-description'),
				reportLocatorName: 'Booking issue description field',
			},
			cancelModalTrigger: {
				locator: this.page.getByTestId('booking-cancel-trigger'),
				reportLocatorName: 'Booking cancel trigger button',
			},
			cancelSubmit: {
				locator: this.page.getByTestId('booking-cancel-submit-button'),
				reportLocatorName: 'Booking cancel submit button',
			},
		};

		this.siteHandler = new SiteHandler(page);
	}

	public async isElementVisible(fieldType: keyof typeof this.bookingsPageElementLocators): Promise<void> {
		const field = this.bookingsPageElementLocators[fieldType];
		await expect(field.locator, `${field.reportLocatorName} should be visible`).toBeVisible();
	}

	public async clickElement(fieldType: keyof typeof this.bookingsPageElementLocators): Promise<void> {
		const field = this.bookingsPageElementLocators[fieldType];
		await test.step(`Click ${field.reportLocatorName}`, async () => await field.locator.click());
	}

	public async bookingsPageLoaded(): Promise<void> {
		await this.siteHandler.pageLoaded(/bookings/, 'bookings');
	}
}
