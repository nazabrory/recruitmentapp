import { expect, test } from '@playwright/test'

for (const language of ['id', 'en'] as const) {
  test(`complete showcase in ${language}, with a clean second profile and reset`, async ({
    page,
    browser,
    baseURL,
  }) => {
    const en = language === 'en'
    const button = (name: string) =>
      page.getByRole('button', { name, exact: true })
    const perspective = () => page.locator('header select')
    const ballot = () =>
      page.getByRole('combobox', {
        name: en ? 'Assessor recommendation' : 'Rekomendasi asesor',
        exact: true,
      })
    const meeting = () => button(en ? 'Deliberation' : 'Musyawarah').click()
    const selection = () =>
      page.getByLabel(
        en ? 'Application for Deliberation' : 'Lamaran untuk musyawarah',
      )
    const final = () =>
      page.getByRole('combobox', {
        name: en ? 'Final Candidate Decision' : 'Keputusan akhir kandidat',
        exact: true,
      })
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/#apply')
    if (en) await button('English').click()
    await button(en ? 'Fill sample details' : 'Isi contoh').click()
    await button(en ? 'Submit Application' : 'Kirim lamaran').click()
    await page
      .getByRole('link', {
        name: en ? 'View Application status' : 'Lihat status lamaran',
      })
      .click()
    const statusUrl = page.url()
    await expect(
      page.getByRole('heading', {
        name: en ? 'Application status' : 'Status lamaran',
      }),
    ).toBeVisible()
    await expect(page.locator('body')).not.toContainText('Ratna Dewi · Accept')
    await page.setViewportSize({ width: 1180, height: 820 })
    await perspective().selectOption('ayu')
    await expect(
      page.getByText(en ? '9 Applications' : '9 Lamaran', { exact: true }),
    ).toBeVisible()
    const casePicker = page.getByLabel(
      en ? 'Application to review' : 'Lamaran untuk ditinjau',
    )
    for (const which of ['clear', 'gap']) {
      await casePicker.selectOption(which)
      const links = page.getByRole('link', {
        name: new RegExp(en ? 'Open source' : 'Buka sumber'),
      })
      await expect(links).toHaveCount(3)
      for (const link of await links.all()) {
        const opened = page.waitForEvent('popup')
        await link.click()
        const original = await opened
        await expect(original.locator(':target')).toBeVisible()
        await expect(original.locator(':target')).toHaveText(
          await page.locator('blockquote mark').innerText(),
        )
        await original.close()
      }
      if (which === 'clear')
        await expect(
          page.getByText(en ? /87\.5 \/ 100/ : /87,5 \/ 100/),
        ).toBeVisible()
      else {
        await expect(
          page.getByText(en ? 'Needs review' : 'Perlu ditinjau', {
            exact: true,
          }),
        ).toBeVisible()
        await expect(
          page.getByText(en ? /Total withheld/ : /Total ditunda/),
        ).toBeVisible()
      }
    }
    await casePicker.selectOption('clear')
    await ballot().selectOption('reject')
    await page.getByRole('textbox').fill('Private field diary 04')
    await button(en ? 'Save recommendation' : 'Simpan rekomendasi').click()
    await page.reload()
    await expect(ballot()).toHaveValue('reject')
    await perspective().selectOption('bima')
    await expect(ballot()).toHaveValue('hold')
    await expect(page.getByRole('textbox')).toHaveValue('')
    await perspective().selectOption('ayu')
    await button(en ? 'Technical Test' : 'Tes teknis').click()
    await expect(page.locator('figure img')).toBeVisible()
    expect(
      await page
        .locator('figure img')
        .evaluate((img) => (img as HTMLImageElement).naturalWidth),
    ).toBeGreaterThan(600)
    await expect(page.locator('mark')).toHaveText('singkapan?')
    await expect(button(en ? 'Save grade' : 'Simpan nilai')).toBeDisabled()
    await page.getByRole('checkbox').check()
    await page
      .getByLabel(
        en ? 'Bed order and orientation' : 'Urutan dan orientasi lapisan',
      )
      .selectOption('1')
    await page
      .getByLabel(
        en
          ? 'Observation and field check'
          : 'Pengamatan dan pemeriksaan lapangan',
      )
      .selectOption('1')
    await button(en ? 'Save grade' : 'Simpan nilai').click()
    await page.reload()
    await expect(page.getByRole('status')).toHaveText(/Ayu Lestari · 2 \/ 4/)
    await meeting()
    await expect(final()).toHaveCount(0)
    await expect(
      page.getByText(en ? 'Applied' : 'Lamaran masuk', { exact: true }),
    ).toBeVisible()
    await expect(page.locator('body')).not.toContainText(
      'Private field diary 04',
    )
    await perspective().selectOption('coordinator')
    await selection().selectOption('app-03')
    await expect(page.getByText(/2 \/ 4 \(/)).toBeVisible()
    await expect(page.getByText(/3 \/ 4 \(/)).toBeVisible()
    await selection().selectOption('app-01')
    await expect(
      page.getByText(en ? 'Reject' : 'Tolak', { exact: true }).first(),
    ).toBeVisible()
    await expect(
      page.getByText(en ? 'Hold' : 'Tunda', { exact: true }).first(),
    ).toBeVisible()
    await expect(page.getByText(/2 \/ 4 \(/)).toHaveCount(0)
    await final().selectOption('accept')
    await button(en ? 'Record final decision' : 'Catat keputusan akhir').click()
    await page.reload()
    await expect(page.getByRole('status')).toContainText('Ratna Dewi')
    await expect(
      page.getByText(en ? 'Screened' : 'Lolos penyaringan', { exact: true }),
    ).toBeVisible()
    await page.goto(statusUrl)
    await expect(page.locator('body')).not.toContainText(
      /Private field diary 04|Suggested Score|Rekomendasi tersimpan|Recorded by/,
    )
    const independent = await browser.newContext({ baseURL })
    try {
      const other = await independent.newPage()
      await other.goto(statusUrl)
      await expect(
        other.getByText('Status lamaran tidak tersedia di browser ini.'),
      ).toBeVisible()
      await other.locator('header select').selectOption('coordinator')
      await expect(other.getByText('8 Lamaran', { exact: true })).toBeVisible()
    } finally {
      await independent.close()
    }
    await button(en ? 'Reset walkthrough' : 'Atur ulang demo').click()
    await button(en ? 'Restore showcase' : 'Pulihkan demo').click()
    await perspective().selectOption('ayu')
    await expect(page.getByText('8 Lamaran', { exact: true })).toBeVisible()
    await expect(
      page.getByRole('combobox', { name: 'Rekomendasi asesor', exact: true }),
    ).toHaveValue('accept')
    await expect(page.getByRole('textbox')).toHaveValue('')
    await perspective().selectOption('coordinator')
    await expect(
      page.getByRole('combobox', {
        name: 'Keputusan akhir kandidat',
        exact: true,
      }),
    ).toHaveValue('')
  })
}
