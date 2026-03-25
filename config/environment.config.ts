// path: config/environment.config.ts

/**
 * URL configuration for all page objects.
 */
export const UrlConfig = {
  home: '/',
  login: '/login',
  profile: '/profile',
  alertsWindows: '/alertsWindows',
} as const;

/**
 * Shared test user data for DemoQA scenarios.
 */
export const TestUserConfig = {
  bookStoreUser: {
    username: 'Test1',
    password: 'Test123!',
  },
} as const;

export type UrlKey = keyof typeof UrlConfig;
