import { expect, test } from '@playwright/test'

test('the final decision stays with the selected Application after refresh', async ({page}) => {
  await page.goto('/')
  await page.getByRole('button', {name:'English'}).click()
  await page.getByRole('combobox', {name:'Perspective'}).selectOption('coordinator')
  const applications = page.getByRole('combobox', {name:'Application for Deliberation'})
  const decision = page.getByRole('combobox', {name:'Final Candidate Decision'})
  await applications.selectOption({label:'Reno Pradana'})
  await decision.selectOption('reject')
  await page.getByRole('button', {name:'Record final decision'}).click()
  await page.reload()
  await expect(page.getByRole('heading', {name:'Reno Pradana'})).toBeVisible()
  await expect(page.getByRole('status')).toHaveText('Reject · Recorded by Ratna Dewi')
  await expect(decision).toHaveCount(0)
  await applications.selectOption({label:'Dara Paramita'})
  await expect(decision).toHaveValue('')
})
