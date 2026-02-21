// @ts-check
import { test, expect } from '@playwright/test'

test.describe('Catalog Playground E2E Tests', () => {
	test.beforeEach(async ({ page }) => {
		// Go directly to the playground index
		await page.goto('/')
	})

	test('should render the catalog title', async ({ page }) => {
		// Ensure catalog header is visible
		const header = page.getByRole('heading', { name: 'Каталог Блоків OLMUI' })
		await expect(header).toBeVisible()
	})

	test('should display dual code blocks with JSX and YAML', async ({ page }) => {
		// Description block is present
		const descBlock = page.locator('#block-description')
		await expect(descBlock).toBeVisible()

		// Check for JSX and YAML cards within the block
		await expect(descBlock.getByText('JSX').first()).toBeVisible()
		await expect(descBlock.getByText('Meta Data (YAML)').first()).toBeVisible()

		// Ensure "doc" property is used instead of "page" in JSX code
		await expect(descBlock.filter({ hasText: 'doc={{ description:' }).first()).toBeVisible()
	})

	test('should auto-wrap ul/ol strings into li elements', async ({ page }) => {
		const contentBlock = page.locator('#block-content')
		await expect(contentBlock).toBeVisible()

		// In the lists example, we expect "Вік від 21 до 65 років" to be wrapped in an <li> inside <ul>
		const listsExample = contentBlock.locator('.card-body.bg-white').first()
		const listItem = listsExample.locator('ul > li').filter({ hasText: 'Вік від 21 до 65 років' })
		await expect(listItem).toBeVisible()

		// ol list item check
		const olListItem = listsExample.locator('ol > li').filter({ hasText: 'Подати заявку онлайн' })
		await expect(olListItem).toBeVisible()
	})

	test('should render tables with thead and tbody', async ({ page }) => {
		const contentBlock = page.locator('#block-content')
		await expect(contentBlock).toBeVisible()

		const tableExample = contentBlock.locator('.card-body.bg-white').nth(1)

		// Ensure the table structure is rendered correctly with multi-key objects
		const table = tableExample.locator('table.table')
		await expect(table).toBeVisible()
		await expect(table.locator('thead th').filter({ hasText: 'Назва' })).toBeVisible()
		await expect(table.locator('tbody td').filter({ hasText: 'Ощадний' })).toBeVisible()
	})

	test('should parse markdown links in Files block', async ({ page }) => {
		const filesBlock = page.locator('#block-files')
		await expect(filesBlock).toBeVisible()

		const firstExample = filesBlock.locator('.card-body.bg-white').first()

		// "[Тарифи банку (PDF)](/tariffs.pdf)" should become <a href="/tariffs.pdf">Тарифи банку (PDF)</a>
		const mdLink = firstExample.locator('a[href="/tariffs.pdf"]')
		await expect(mdLink).toBeVisible()
		await expect(mdLink).toHaveText('Тарифи банку (PDF)')
	})

	test('should render format highlights (e.g., spans and bold) in Features', async ({ page }) => {
		const featuresBlock = page.locator('#block-features')
		await expect(featuresBlock).toBeVisible()

		const formatExample = featuresBlock.locator('.card-body.bg-white').nth(1)

		// Ensure bold text is wrapped in <b>
		const boldText = formatExample.locator('b').filter({ hasText: 'Гарантована безпека' })
		await expect(boldText).toBeVisible()

		// Ensure nested spans working
		const spanText = formatExample.locator('span').filter({ hasText: 'Підтримка двох мов (UK/EN)' })
		await expect(spanText).toBeVisible()
	})

	test('should toggle locale and update text', async ({ page }) => {
		const priceBlock = page.locator('#block-price')
		await expect(priceBlock).toBeVisible()

		// By default uk
		await expect(priceBlock.getByText('Ціна:', { exact: true }).first()).toBeVisible()

		// Click toggle
		await page.getByRole('button', { name: '🇺🇦 UK → EN' }).click()

		// Verify string changes
		await expect(priceBlock.getByText('Price:', { exact: true }).first()).toBeVisible()

		// Check toggle button changed
		await expect(page.getByRole('button', { name: '🇬🇧 EN → UK' })).toBeVisible()
	})
})
