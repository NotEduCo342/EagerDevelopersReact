import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '@/types';
import { errorLogger } from '@/utils/errorLogger';
import ErrorFallback from './ErrorFallback';

/**
 * ErrorBoundary Component - React Error Boundary Implementation
 * 
 * This class component catches JavaScript errors in the component tree below it,
 * logs error details, and displays a fallback UI instead of crashing the entire app.
 * 
 * Features:
 * - Automatic error logging with unique IDs
 * - Customizable fallback UI components
 * - Development vs Production error handling
 * - Error recovery and retry mechanisms
 * - Integration with error logging service
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    };
  }

  /**
   * Static method called when an error is thrown
   * Updates state to render fallback UI
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Called when an error is caught
   * Handles error logging and additional error information
   */
  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error using our error logging service
    const errorId = errorLogger.logErrorBoundary(error, errorInfo);
    
    // Update state with error information
    this.setState({
      error,
      errorInfo,
      errorId,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log additional context information
    console.groupCollapsed('🔍 Error Boundary Context');
    console.log('Error ID:', errorId);
    console.log('Component Stack:', errorInfo.componentStack);
    console.log('Props at time of error:', this.props);
    console.log('Isolation mode:', this.props.isolate || false);
    console.groupEnd();
  }

  /**
   * Reset error state to retry rendering
   */
  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    });
  };

  /**
   * Automatic error recovery after a delay
   * Useful for temporary network issues or transient errors
   */
  scheduleAutoReset = (delayMs: number = 5000): void => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }

    this.resetTimeoutId = window.setTimeout(() => {
      console.log('🔄 Auto-recovering from error...');
      this.resetError();
    }, delayMs);
  };

  /**
   * Cleanup timeout on unmount
   */
  override componentWillUnmount(): void {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  /**
   * Render method - shows children or fallback UI
   */
  override render(): ReactNode {
    if (this.state.hasError) {
      const { error, errorInfo, errorId } = this.state;
      
      if (!error || !errorInfo || !errorId) {
        // Fallback for edge cases where state is incomplete
        return (
          <div className="min-h-screen bg-red-50 flex items-center justify-center p-4" dir="rtl">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h1 className="text-2xl font-bold text-red-600 font-kalameh mb-4">
                خطای ناشناخته
              </h1>
              <p className="text-gray-600 font-kalameh">
                خطایی رخ داده که قابل شناسایی نیست. لطفاً صفحه را بارگیری مجدد کنید.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg font-kalameh hover:bg-blue-600 transition-colors"
              >
                بارگیری مجدد
              </button>
            </div>
          </div>
        );
      }

      // Use custom fallback component if provided, otherwise use default
      const FallbackComponent = this.props.fallback || ErrorFallback;
      
      return (
        <FallbackComponent
          error={error}
          errorInfo={errorInfo}
          resetError={this.resetError}
          errorId={errorId}
        />
      );
    }

    // No error - render children normally
    return this.props.children;
  }
}

/**
 * HOC (Higher-Order Component) for easier ErrorBoundary usage
 * 
 * Usage:
 * const SafeComponent = withErrorBoundary(MyComponent);
 * const SafeComponentWithCustomFallback = withErrorBoundary(MyComponent, CustomFallback);
 */
export const withErrorBoundary = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: React.ComponentType<any>,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
) => {
  const WithErrorBoundaryComponent = (props: P) => (
    <ErrorBoundary fallback={fallback} onError={onError}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundaryComponent.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return WithErrorBoundaryComponent;
};

/**
 * Hook for manual error throwing (useful for testing)
 */
export const useErrorHandler = () => {
  return React.useCallback((error: Error, errorInfo?: any) => {
    // In development, we can throw the error to trigger error boundary
    if (import.meta.env.DEV && errorInfo) {
      throw error;
    }
    
    // In production, log the error without crashing
    errorLogger.logError(error, 'high', errorInfo);
  }, []);
};

export default ErrorBoundary;
