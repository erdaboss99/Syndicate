import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto(process.env.BASE_URL!);

	await expect(page).toHaveTitle(/Syndicate/);
});
