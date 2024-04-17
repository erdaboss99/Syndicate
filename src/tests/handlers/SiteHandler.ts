import { test, type Page } from '@playwright/test';

export class SiteHandler {
	private readonly page: Page;
	constructor(page: Page) {
		this.page = page;
	}

	public async pageLoaded(urlRegex: RegExp, reportName: string): Promise<void> {
		await test.step(`Wait for the ${reportName} page to load`, async () => {
			await this.page.waitForURL(urlRegex, { timeout: 30_000 });
			await this.page.waitForLoadState('networkidle');
		});
	}
}
