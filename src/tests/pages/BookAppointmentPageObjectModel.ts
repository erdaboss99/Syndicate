import { expect, test, type Page } from '@playwright/test';

import { SiteHandler } from '@/tests/handlers/SiteHandler';
import { PrettyLocator } from '@/tests/types';
export class BookAppointmentPageObjectModel {
	private readonly page: Page;
	private readonly siteHandler: SiteHandler;
	constructor(page: Page) {
		this.page = page;
		this.siteHandler = new SiteHandler(page);
	}
	public async bookAppointmentPageLoaded(): Promise<void> {
		await this.siteHandler.pageLoaded(
			/appointments\/\d{4}-\d{2}-\d{2}\/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}/,
			'book appointment',
		);
	}
}
