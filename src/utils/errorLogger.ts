import { ErrorLogger, ErrorLogEntry, ErrorSeverity } from '@/types';

/**
 * Generates a unique error ID for tracking
 */
const generateErrorId = (): string => {
  return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Gets user session information for error context
 */
const getSessionInfo = () => {
  return {
    userAgent: navigator.userAgent,
    url: window.location.href,
    timestamp: new Date(),
    sessionId: sessionStorage.getItem('sessionId') || 'anonymous',
    userId: localStorage.getItem('userId') || undefined,
  };
};

/**
 * Determines error severity based on error type and message
 */
const determineSeverity = (error: Error): ErrorSeverity => {
  const errorMessage = error.message.toLowerCase();
  const errorName = error.name.toLowerCase();

  // Critical errors that break the app
  if (errorName.includes('chunklist') || errorMessage.includes('loading chunk')) {
    return 'critical';
  }

  // Network and API errors
  if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    return 'high';
  }

  // React rendering errors
  if (errorName.includes('react') || errorMessage.includes('render')) {
    return 'medium';
  }

  // Default severity
  return 'low';
};

/**
 * Creates an error log entry
 */
const createErrorLogEntry = (
  error: Error, 
  severity: ErrorSeverity, 
  additionalInfo?: Record<string, unknown>
): ErrorLogEntry => {
  const sessionInfo = getSessionInfo();
  
  return {
    id: generateErrorId(),
    message: error.message,
    stack: error.stack,
    severity,
    ...sessionInfo,
    additionalInfo: {
      errorName: error.name,
      ...additionalInfo,
    },
  };
};

/**
 * Logs errors to console in development and external service in production
 */
const logToService = (logEntry: ErrorLogEntry): void => {
  // Development logging
  if (import.meta.env.DEV) {
    console.group(`🚨 Error Logger - ${logEntry.severity.toUpperCase()}`);
    console.error('Message:', logEntry.message);
    console.error('Stack:', logEntry.stack);
    console.error('Error ID:', logEntry.id);
    console.error('Additional Info:', logEntry.additionalInfo);
    console.groupEnd();
  }

  // Production logging (ready for services like Sentry)
  if (import.meta.env.PROD) {
    // TODO: Integrate with external error tracking service in Phase 7
    // Example: Sentry.captureException(error, { extra: logEntry });
    
    // For now, send to a hypothetical logging endpoint
    if (logEntry.severity === 'critical' || logEntry.severity === 'high') {
      // Only log critical and high severity errors to reduce noise
      console.error('Production Error:', {
        id: logEntry.id,
        message: logEntry.message,
        severity: logEntry.severity,
        url: logEntry.url,
        timestamp: logEntry.timestamp,
      });
    }
  }
};

/**
 * Main Error Logger Implementation
 */
export const errorLogger: ErrorLogger = {
  /**
   * Log a general error with specified severity
   */
  logError: (
    error: Error, 
    severity: ErrorSeverity, 
    additionalInfo?: Record<string, unknown>
  ): string => {
    const logEntry = createErrorLogEntry(error, severity, additionalInfo);
    logToService(logEntry);
    return logEntry.id;
  },

  /**
   * Log an error from React Error Boundary
   */
  logErrorBoundary: (
    error: Error, 
    errorInfo: React.ErrorInfo, 
    severity?: ErrorSeverity
  ): string => {
    const determinedSeverity = severity || determineSeverity(error);
    const logEntry = createErrorLogEntry(error, determinedSeverity, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    });
    logToService(logEntry);
    return logEntry.id;
  },
};

/**
 * Utility function to log unhandled promise rejections
 */
export const setupGlobalErrorHandlers = (): void => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error 
      ? event.reason 
      : new Error(String(event.reason));
    
    errorLogger.logError(error, 'high', {
      type: 'unhandledPromiseRejection',
      reason: event.reason,
    });
  });

  // Handle global JavaScript errors
  window.addEventListener('error', (event) => {
    const error = event.error || new Error(event.message);
    errorLogger.logError(error, 'medium', {
      type: 'globalJavaScriptError',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });
};

export default errorLogger;
