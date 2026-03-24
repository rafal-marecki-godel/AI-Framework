// path: config/environment.config.ts

/**
 * URL configuration for all page objects.
 */
export const UrlConfig = {
  home: '/',
  login: '/login',
} as const;

export type UrlKey = keyof typeof UrlConfig;
