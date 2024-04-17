import { expect, test, type Page } from '@playwright/test';

import { SiteHandler } from '@/tests/handlers/SiteHandler';
import { PrettyLocator } from '@/tests/types';
export class BookingsPageObjectModel {
	private readonly page: Page;
	private readonly siteHandler: SiteHandler;
	constructor(page: Page) {
		this.page = page;
		this.siteHandler = new SiteHandler(page);
	}
	public async bookingsPageLoaded(): Promise<void> {
		await this.siteHandler.pageLoaded(/bookings/, 'bookings');
	}
}
