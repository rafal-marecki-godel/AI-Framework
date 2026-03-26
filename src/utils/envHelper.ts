// path: src/utils/envHelper.ts
/**
 * Environment variable helper utilities.
 */
export function getEnvString(key: string, fallback?: string): string {
  const value = process.env[key];
  if (value !== undefined && value !== '') {
    return value;
  }

  if (fallback !== undefined) {
    return fallback;
  }

  throw new Error(`Environment variable ${key} is not defined.`);
}

/**
 * Reads numeric environment variables with safe fallback support.
 */
export function getEnvNumber(key: string, fallback?: number): number {
  const rawValue = process.env[key];
  if (rawValue !== undefined && rawValue !== '') {
    const parsed = Number(rawValue);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
    throw new Error(`Environment variable ${key} must be a valid number`);
  }

  if (fallback !== undefined) {
    return fallback;
  }

  throw new Error(`Environment variable ${key} is not defined.`);
}
