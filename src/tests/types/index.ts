import { Locator } from '@playwright/test';

type ExtendedLocator = {
	locator: Locator;
	reportLocatorName: string;
};

export type PrettyLocator<T extends string[] | string> = T extends string
	? Record<T, ExtendedLocator>
	: Record<T[number], ExtendedLocator>;
