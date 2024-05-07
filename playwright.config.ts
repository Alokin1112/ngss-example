import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  testMatch: /^.*\.spec\.e2e\.ts$/,
  fullyParallel: true,
  forbidOnly: false,
  retries: 1,
  workers: 4,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL: "http://localhost:4200"
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ]
  // {
  //   name: 'firefox',
  //   use: { ...devices['Desktop Firefox'] },
  // },

  // {
  //   name: 'webkit',
  //   use: { ...devices['Desktop Safari'] },
  // },
});
