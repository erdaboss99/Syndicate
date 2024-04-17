import { expect, test, type Page } from '@playwright/test';

import { PrettyLocator } from '@/tests/types';

type DashboardPageElements = 'appointmentsTile' | 'bookingsTile';

export class DashboardPageObjectModel {
	private readonly dashboardPageElementLocators: PrettyLocator<DashboardPageElements[]>;
	constructor(page: Page) {
		this.dashboardPageElementLocators = {
			appointmentsTile: {
				locator: page.getByTestId('dashboard-appointments-tile'),
				reportLocatorName: 'Appointments tile',
			},
			bookingsTile: {
				locator: page.getByTestId('dashboard-bookings-tile'),
				reportLocatorName: 'Bookings tile',
			},
		};
	}

	public async isElementVisible(fieldType: keyof typeof this.dashboardPageElementLocators): Promise<void> {
		const field = this.dashboardPageElementLocators[fieldType];
		await expect(field.locator, `${field.reportLocatorName} should be visible`).toBeVisible();
	}

	public async clickElement(fieldType: keyof typeof this.dashboardPageElementLocators): Promise<void> {
		const field = this.dashboardPageElementLocators[fieldType];
		await test.step(`Click ${field.reportLocatorName}`, async () => await field.locator.click());
	}
}
