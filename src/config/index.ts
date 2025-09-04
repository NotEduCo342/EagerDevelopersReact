/**
 * Unified Configuration Export
 * Combines environment-specific settings with static constants
 */

import { env } from './environment';
import {
  APP_INFO,
  CONTACT_INFO,
  SOCIAL_LINKS,
  NAV_LINKS,
  FORM_CONFIG,
  SEO_CONFIG,
} from './constants';

// Combined configuration object
export const config = {
  // Environment-specific settings
  environment: env,
  
  // Static application data
  app: APP_INFO,
  contact: CONTACT_INFO,
  social: SOCIAL_LINKS,
  navigation: NAV_LINKS,
  forms: FORM_CONFIG,
  seo: SEO_CONFIG,
  
  // Utility functions
  isDevelopment: env.isDevelopment,
  isProduction: env.isProduction,
  isTest: !env.isDevelopment && !env.isProduction,
} as const;

// Re-export individual configurations for direct access if needed
export {
  env,
  APP_INFO,
  CONTACT_INFO,
  SOCIAL_LINKS,
  NAV_LINKS,
  FORM_CONFIG,
  SEO_CONFIG,
};

// Type exports
export type Config = typeof config;
export type Environment = typeof env;
