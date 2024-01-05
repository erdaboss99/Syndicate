/** @type {import("prettier").Config} */
const config = {
	semi: true,
	bracketSpacing: true,
	arrowParens: 'always',
	bracketSameLine: true,
	jsxSingleQuote: true,
	singleAttributePerLine: true,
	printWidth: 120,
	singleQuote: true,
	trailingComma: 'all',
	useTabs: true,
	tabWidth: 4,
	plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
	tailwindConfig: './tailwind.config.ts',
	tailwindFunctions: ['cn', 'cva'],
};

export default config;
