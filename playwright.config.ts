import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: 'tests',
  use: {baseURL: process.env.SHOWCASE_URL || 'http://127.0.0.1:4179', launchOptions:{executablePath:process.env.CHROMIUM_PATH}},
  webServer: process.env.SHOWCASE_URL ? undefined : {
    command:'npm run dev -- --host 127.0.0.1 --port 4179 --strictPort',
    url:'http://127.0.0.1:4179', reuseExistingServer: !process.env.CI
  }
})
