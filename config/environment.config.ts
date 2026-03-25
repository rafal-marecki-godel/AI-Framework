// path: config/environment.config.ts

/**
 * URL configuration for all page objects.
 */
export const UrlConfig = {
  home: '/',
  login: '/login',
  profile: '/profile',
  alertsWindows: '/alertsWindows',
  elements: '/elements',
  forms: '/forms',
  widgets: '/widgets',
  interactions: '/interaction',
} as const;

/**
 * Shared test user data for DemoQA scenarios.
 */
export const TestUserConfig = {
  bookStoreUser: {
    username: 'Test1',
    password: 'Test123!',
  },
  invalidUser: {
    username: 'invalid-user',
    password: 'invalid-password',
  },
} as const;

export type UrlKey = keyof typeof UrlConfig;
