// path: config/environment.config.ts

/**
 * URL configuration for all page objects.
 */
export const UrlConfig = {
  home: '/',
  login: '/login',
  profile: '/profile',
  books: '/books',
  specificBook: '/books',
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
    username: 'test1',
    password: 'Test123!',
  },
  invalidUser: {
    username: 'invalid-user',
    password: 'invalid-password',
  },
  regularUser: {
    username: 'Test3',
    password: 'Test1234567890!',
  },
} as const;

export type UrlKey = keyof typeof UrlConfig;
