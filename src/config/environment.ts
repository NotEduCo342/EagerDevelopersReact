/**
 * Environment Variables Configuration
 * Handles environment-specific settings with type safety and validation
 */

// Environment variable types
interface EnvironmentConfig {
  api: {
    baseUrl: string;
    timeout: number;
  };
  features: {
    enableAnalytics: boolean;
    enableDebugMode: boolean;
    enableDevTools: boolean;
  };
  services: {
    analyticsKey?: string;
    sentryDsn?: string;
  };
  performance: {
    requestCacheTtl: number;
  };
  isDevelopment: boolean;
  isProduction: boolean;
}

// Helper function to parse boolean environment variables
const parseBoolean = (value: string | undefined, defaultValue: boolean = false): boolean => {
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true';
};

// Helper function to parse number environment variables
const parseNumber = (value: string | undefined, defaultValue: number): number => {
  if (value === undefined) return defaultValue;
  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

// Validate required environment variables
const validateEnvironmentVariables = (): void => {
  const required = {
    'VITE_API_BASE_URL': import.meta.env.VITE_API_BASE_URL,
  };

  const missing = Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing.join(', '));
    console.warn('Please check your .env file and ensure all required variables are set.');
  }
};

// Create and export environment configuration
export const env: EnvironmentConfig = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
    timeout: parseNumber(import.meta.env.VITE_API_TIMEOUT, 10000),
  },
  features: {
    enableAnalytics: parseBoolean(import.meta.env.VITE_ENABLE_ANALYTICS),
    enableDebugMode: parseBoolean(import.meta.env.VITE_ENABLE_DEBUG_MODE, true),
    enableDevTools: parseBoolean(import.meta.env.VITE_ENABLE_DEV_TOOLS, true),
  },
  services: {
    analyticsKey: import.meta.env.VITE_ANALYTICS_KEY,
    sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  },
  performance: {
    requestCacheTtl: parseNumber(import.meta.env.VITE_REQUEST_CACHE_TTL, 300000),
  },
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Validate environment variables on module load
validateEnvironmentVariables();

// Debug logging in development
if (env.isDevelopment && env.features.enableDebugMode) {
  console.group('🔧 Environment Configuration');
  console.log('Mode:', env.isProduction ? 'Production' : 'Development');
  console.log('API Base URL:', env.api.baseUrl);
  console.log('Features:', env.features);
  console.groupEnd();
}

// Export utility functions
export const isFeatureEnabled = (feature: keyof EnvironmentConfig['features']): boolean => {
  return env.features[feature];
};

export const getApiUrl = (endpoint: string): string => {
  return `${env.api.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

// Export types
export type { EnvironmentConfig };
