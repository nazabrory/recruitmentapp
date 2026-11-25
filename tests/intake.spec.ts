import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 390, height: 844 } })

const prompts = {
  id: {
    name: 'Nama lengkap',
    email: 'Email',
    sample: 'Isi contoh',
    cv: 'CV contoh',
    original: 'Buka CV contoh',
    field: 'Pengalaman pemetaan',
    notes: 'Pencatatan sampel',
    video: 'Video perkenalan',
    send: 'Kirim lamaran',
    received: 'Lamaran diterima',
    link: 'Lihat status lamaran',
    status: 'Status lamaran',
    private: /Ballot|Surat Suara|Skor Saran|Catatan pribadi/i,
  },
  en: {
    name: 'Full name',
    email: 'Email',
    sample: 'Fill sample details',
    cv: 'Sample CV',
    original: 'Open sample CV',
    field: 'Mapping experience',
    notes: 'Sample records',
    video: 'Intro Video',
    send: 'Submit Application',
    received: 'Application received',
    link: 'View Application status',
    status: 'Application status',
    private: /Ballot|Suggested Score|Private notes/i,
  },
}
for (const language of ['id', 'en'] as const) {
  test(`Candidate resumes and submits one Application on a phone in ${language}`, async ({
    page,
  }) => {
    const t = prompts[language]
    await page.goto('/#apply')
    if (language === 'en')
      await page.getByRole('button', { name: 'English', exact: true }).click()
    await page.getByRole('button', { name: t.sample, exact: true }).click()
    await page.getByLabel(t.name, { exact: true }).fill('Nala Kirana')
    await page.getByLabel(t.email, { exact: true }).fill('nala@example.test')
    const cv = page.getByLabel(t.cv, { exact: true })
    await cv.selectOption('field')
    const original = page.waitForEvent('popup')
    await page.getByRole('link', { name: t.original }).click()
    const cvPage = await original
    await expect(
      cvPage.getByRole('heading', { name: 'Nala Kirana' }),
    ).toBeVisible()
    await cvPage.close()
    await page.getByLabel(t.field, { exact: true }).fill('Mapped six outcrops.')
    await page
      .getByLabel(t.notes, { exact: true })
      .fill('Paired field labels with coordinates.')
    await page.reload()
    await expect(page.getByLabel(t.field, { exact: true })).toHaveValue(
      'Mapped six outcrops.',
    )
    const video = page.getByRole('combobox', { name: t.video, exact: true })
    for (const clip of ['field', 'core']) {
      await video.selectOption(clip)
      await expect(page.locator('video')).toHaveAttribute(
        'src',
        `/samples/intake/${clip}-${language}.mp4`,
      )
      await expect
        .poll(() =>
          page
            .locator('video')
            .evaluate((el) => (el as HTMLVideoElement).duration),
        )
        .toBeGreaterThan(1)
    }
    await video.selectOption('')
    await expect(page.locator('video')).toHaveCount(0)
    await page.getByRole('button', { name: t.send, exact: true }).click()
    await expect(page.getByRole('heading', { name: t.received })).toBeVisible()
    const link = page.getByRole('link', { name: t.link })
    await link.click()
    await expect(page.getByRole('heading', { name: t.status })).toBeVisible()
    await expect(page.getByText('Nala Kirana', { exact: true })).toBeVisible()
    await expect(page.getByText(t.private)).toHaveCount(0)
    await page.reload()
    await expect(page.getByRole('heading', { name: t.status })).toBeVisible()
    await page.goto('/#apply')
    await expect(page.getByRole('button', { name: t.send })).toHaveCount(0)
    await expect(page.getByRole('link', { name: t.link })).toBeVisible()
  })
}
