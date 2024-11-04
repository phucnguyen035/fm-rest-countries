import type { PlaywrightTestConfig } from '@playwright/test';

export default {
  webServer: {
    command: 'pnpm build && pnpm preview',
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
} satisfies PlaywrightTestConfig;
