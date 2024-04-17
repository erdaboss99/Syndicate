import { expect, test, type Page } from '@playwright/test';

import { SiteHandler } from '@/tests/handlers/SiteHandler';
import { PrettyLocator } from '@/tests/types';

type DashboardPageElements = 'appointmentsTile' | 'bookingsTile';

export class DashboardPageObjectModel {
	private readonly page: Page;
	private readonly dashboardPageElementLocators: PrettyLocator<DashboardPageElements[]>;

	private readonly siteHandler: SiteHandler;

	constructor(page: Page) {
		this.page = page;
		this.dashboardPageElementLocators = {
			appointmentsTile: {
				locator: this.page.getByTestId('dashboard-appointments-tile'),
				reportLocatorName: 'Appointments tile',
			},
			bookingsTile: {
				locator: this.page.getByTestId('dashboard-bookings-tile'),
				reportLocatorName: 'Bookings tile',
			},
		};

		this.siteHandler = new SiteHandler(page);
	}

	public async isElementVisible(fieldType: keyof typeof this.dashboardPageElementLocators): Promise<void> {
		const field = this.dashboardPageElementLocators[fieldType];
		await expect(field.locator, `${field.reportLocatorName} should be visible`).toBeVisible();
	}

	public async clickElement(fieldType: keyof typeof this.dashboardPageElementLocators): Promise<void> {
		const field = this.dashboardPageElementLocators[fieldType];
		await test.step(`Click ${field.reportLocatorName}`, async () => await field.locator.click());
	}

	public async dashboardPageLoaded(): Promise<void> {
		await this.siteHandler.pageLoaded(/dashboard/, 'dashboard');
	}
}
