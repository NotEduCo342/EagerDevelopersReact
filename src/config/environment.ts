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
  environment: {
    name: string;
    showBadge: boolean;
  };
  isDevelopment: boolean;
  isProduction: boolean;
  isStaging: boolean;
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

// Detect current environment
const detectEnvironment = (): string => {
  // Check explicit environment variable
  if (import.meta.env.VITE_ENVIRONMENT_NAME) {
    return import.meta.env.VITE_ENVIRONMENT_NAME;
  }
  
  // Fallback to Vite's mode detection
  if (import.meta.env.PROD) return 'production';
  if (import.meta.env.DEV) return 'development';
  
  // Check URL patterns as last resort
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('staging')) return 'staging';
    if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) return 'development';
  }
  
  return 'development';
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
  
  // Validate API URL format
  if (import.meta.env.VITE_API_BASE_URL) {
    try {
      new URL(import.meta.env.VITE_API_BASE_URL);
    } catch {
      console.error('Invalid VITE_API_BASE_URL format:', import.meta.env.VITE_API_BASE_URL);
    }
  }
};

// Create and export environment configuration
export const env: EnvironmentConfig = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
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
  environment: {
    name: detectEnvironment(),
    showBadge: parseBoolean(import.meta.env.VITE_SHOW_ENV_BADGE, true),
  },
  isDevelopment: detectEnvironment() === 'development',
  isProduction: detectEnvironment() === 'production',
  isStaging: detectEnvironment() === 'staging',
};

// Validate environment variables on module load
validateEnvironmentVariables();

// Debug logging in development
if (env.isDevelopment && env.features.enableDebugMode) {
  console.group('🔧 Environment Configuration');
  console.log('Environment:', env.environment.name.toUpperCase());
  console.log('Mode:', env.isProduction ? 'Production' : 'Development');
  console.log('API Base URL:', env.api.baseUrl);
  console.log('Features:', env.features);
  console.groupEnd();
}

// Production warnings
if (env.isProduction) {
  if (env.features.enableDebugMode) {
    console.warn('⚠️ Debug mode is enabled in production!');
  }
  if (env.features.enableDevTools) {
    console.warn('⚠️ Dev tools are enabled in production!');
  }
}

// Export utility functions
export const isFeatureEnabled = (feature: keyof EnvironmentConfig['features']): boolean => {
  return env.features[feature];
};

export const getApiUrl = (endpoint: string): string => {
  return `${env.api.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

export const getCurrentEnvironment = (): string => env.environment.name;

export const isEnvironment = (envName: string): boolean => env.environment.name === envName;

// Export types
export type { EnvironmentConfig };
