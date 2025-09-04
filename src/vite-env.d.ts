/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_DEBUG_MODE: string;
  readonly VITE_ENABLE_DEV_TOOLS: string;
  readonly VITE_ANALYTICS_KEY: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_REQUEST_CACHE_TTL: string;
  // Add more environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
