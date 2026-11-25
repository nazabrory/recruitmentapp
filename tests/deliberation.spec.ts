import { expect, test } from '@playwright/test'

for (const lang of ['id', 'en'] as const) {
  test(`Coordinator records a persistent final decision in ${lang}`, async ({
    page,
  }) => {
    const en = lang === 'en'
    await page.goto('/')
    if (en)
      await page.getByRole('button', { name: 'English', exact: true }).click()
    await page
      .getByRole('combobox', { name: en ? 'Perspective' : 'Peran' })
      .selectOption('coordinator')
    const decision = page.getByRole('combobox', {
      name: en ? 'Final Candidate Decision' : 'Keputusan akhir kandidat',
      exact: true,
    })
    await decision.selectOption({ label: en ? 'Accept' : 'Terima' })
    await page
      .getByRole('button', {
        name: en ? 'Record final decision' : 'Catat keputusan akhir',
      })
      .click()
    await page.reload()
    await expect(decision).toHaveCount(0)
    await expect(page.getByRole('status')).toHaveText(
      en
        ? 'Accept · Recorded by Ratna Dewi'
        : 'Terima · Dicatat oleh Ratna Dewi',
    )
  })
}
