import {test, expect} from '@playwright/test'

test('Campaign opens in Indonesian and remembers the presenter language and role', async ({page}) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang','id')
  await page.getByRole('button',{name:'English'}).click()
  await page.getByLabel('Perspective').selectOption('coordinator')
  await expect(page.getByText('8 Applications', {exact:true})).toBeVisible()
  await page.reload()
  await expect(page.getByLabel('Perspective')).toHaveValue('coordinator')
  await expect(page.locator('html')).toHaveAttribute('lang','en')
})
