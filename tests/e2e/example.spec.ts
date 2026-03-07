import { test, expect } from '@playwright/test'

test('homepage has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Vite \+ Vue/)
})

test('homepage contains welcome message', async ({ page }) => {
  await page.goto('/')
  const heading = page.locator('h1')
  await expect(heading).toContainText('Vite + Vue')
})
