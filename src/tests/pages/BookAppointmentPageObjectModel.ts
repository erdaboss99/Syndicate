import { expect, test, type Page } from '@playwright/test';

import { SiteHandler } from '@/tests/handlers/SiteHandler';
import { PrettyLocator } from '@/tests/types';

type BookAppointmentPageElements =
	| 'issueSelectTrigger'
	| 'firstIssueSelectItem'
	| 'issueDescription'
	| 'bookAppointmentSubmit';

export class BookAppointmentPageObjectModel {
	private readonly page: Page;
	private readonly bookAppointmentPageElementLocators: PrettyLocator<BookAppointmentPageElements[]>;

	private readonly siteHandler: SiteHandler;

	constructor(page: Page) {
		this.page = page;
		this.bookAppointmentPageElementLocators = {
			issueSelectTrigger: {
				locator: this.page.getByTestId('appointment-book-issue-select-trigger'),
				reportLocatorName: 'Issue select trigger',
			},
			firstIssueSelectItem: {
				locator: this.page.getByTestId('appointment-book-issue-select-item').first(),
				reportLocatorName: 'First issue select item',
			},
			issueDescription: {
				locator: this.page.getByTestId('appointment-book-issue-description-input'),
				reportLocatorName: 'Issue description',
			},
			bookAppointmentSubmit: {
				locator: this.page.getByTestId('appointment-book-submit-button'),
				reportLocatorName: 'Book appointment submit',
			},
		};

		this.siteHandler = new SiteHandler(page);
	}

	public async isElementVisible(fieldType: keyof typeof this.bookAppointmentPageElementLocators): Promise<void> {
		const field = this.bookAppointmentPageElementLocators[fieldType];
		await expect(field.locator, `${field.reportLocatorName} should be visible`).toBeVisible();
	}

	public async clickElement(fieldType: keyof typeof this.bookAppointmentPageElementLocators): Promise<void> {
		const field = this.bookAppointmentPageElementLocators[fieldType];
		await test.step(`Click ${field.reportLocatorName}`, async () => await field.locator.click());
	}

	async fillElement(value: string, fieldType: keyof typeof this.bookAppointmentPageElementLocators): Promise<void> {
		const field = this.bookAppointmentPageElementLocators[fieldType];
		await test.step(`Fill ${field.reportLocatorName}`, async () => await field.locator.fill(value));
	}

	public async bookAppointmentPageLoaded(): Promise<void> {
		await this.siteHandler.pageLoaded(
			/appointments\/\d{4}-\d{2}-\d{2}\/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}/,
			'book appointment',
		);
	}
}
