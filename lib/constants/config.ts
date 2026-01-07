// Application configuration constants

export const APP_NAME = 'LifeGrow';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Self Improvement Platform';

// Feature flags
export const FEATURES = {
  HABITS: true,
  CASHFLOW: true,
  FITNESS: true,
  WELLNESS: true,
  GAMIFICATION: true,
  INSIGHTS: true,
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Date formats
export const DATE_FORMAT = 'yyyy-MM-dd';
export const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';
export const DISPLAY_DATE_FORMAT = 'MMM dd, yyyy';
export const DISPLAY_DATETIME_FORMAT = 'MMM dd, yyyy HH:mm';
