// path: src/utils/logger.ts
/**
 * Centralized logger utility for consistent test logging.
 */
export class Logger {
  /**
   * Logs informational messages.
   * @param message Informational log message.
   */
  public static info(message: string): void {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  }

  /**
   * Logs warning messages.
   * @param message Warning log message.
   */
  public static warn(message: string): void {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
  }

  /**
   * Logs error messages.
   * @param message Error log message.
   */
  public static error(message: string): void {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
  }
}
