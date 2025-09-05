import React from 'react';
import { ErrorFallbackProps } from '@/types';

/**
 * ErrorFallback Component - Persian RTL Error UI
 * 
 * This component displays a user-friendly error message when React Error Boundaries
 * catch JavaScript errors. It uses Kalameh font for better Persian readability
 * and matches the existing design system.
 */
const ErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  errorInfo, 
  resetError, 
  errorId 
}) => {
  const isDevelopment = import.meta.env.DEV;

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const copyErrorDetails = () => {
    const errorDetails = `
خطای شناسه: ${errorId}
پیام خطا: ${error.message}
زمان: ${new Date().toLocaleString('fa-IR')}
مرورگر: ${navigator.userAgent}
صفحه: ${window.location.href}
${isDevelopment ? `
جزئیات فنی:
${error.stack || 'ناموجود'}

Component Stack:
${errorInfo.componentStack || 'ناموجود'}
` : ''}
    `;
    
    navigator.clipboard.writeText(errorDetails.trim()).then(() => {
      alert('جزئیات خطا کپی شد!');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-2xl w-full">
        {/* Main Error Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-10 h-10 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white font-kalameh mb-2">
              خطایی رخ داده است!
            </h1>
            <p className="text-white/90 font-kalameh text-lg">
              متأسفیم، مشکلی در نمایش این بخش پیش آمده است
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-gray-800 font-kalameh mb-4">
                چه اتفاقی افتاده؟
              </h2>
              <p className="text-gray-600 font-kalameh leading-relaxed">
                یک خطای فنی در برنامه رخ داده است. این مشکل به تیم فنی گزارش شده و تلاش می‌کنیم
                در اسرع وقت آن را برطرف کنیم. می‌توانید از گزینه‌های زیر استفاده کنید:
              </p>
            </div>

            {/* Error Info for Development */}
            {isDevelopment && (
              <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-bold text-gray-800 font-kalameh mb-2">
                  اطلاعات خطا (حالت توسعه):
                </h3>
                <p className="text-sm text-gray-700 font-mono mb-2">
                  <strong>پیام:</strong> {error.message}
                </p>
                <p className="text-sm text-gray-700 font-mono mb-2">
                  <strong>شناسه خطا:</strong> {errorId}
                </p>
                {error.stack && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm font-kalameh text-gray-600 hover:text-gray-800">
                      نمایش جزئیات فنی
                    </summary>
                    <pre className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded overflow-auto max-h-40">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={resetError}
                className="w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg font-kalameh"
              >
                🔄 تلاش مجدد
              </button>
              
              <button
                onClick={handleReload}
                className="w-full sm:w-auto px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg font-kalameh"
              >
                🔃 بارگیری مجدد صفحه
              </button>
              
              <button
                onClick={handleGoHome}
                className="w-full sm:w-auto px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg font-kalameh"
              >
                🏠 بازگشت به خانه
              </button>
            </div>

            {/* Copy Error Details Button */}
            <div className="mt-6 text-center">
              <button
                onClick={copyErrorDetails}
                className="text-sm text-gray-500 hover:text-gray-700 underline font-kalameh"
              >
                📋 کپی جزئیات خطا برای گزارش
              </button>
            </div>

            {/* Support Information */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center">
              <h3 className="font-bold text-blue-800 font-kalameh mb-2">
                نیاز به کمک دارید؟
              </h3>
              <p className="text-blue-700 font-kalameh text-sm leading-relaxed">
                اگر این مشکل ادامه داشت، لطفاً با تیم پشتیبانی تماس بگیرید و شناسه خطا را ارائه دهید:
                <br />
                <code className="bg-blue-100 px-2 py-1 rounded text-xs font-mono mt-1 inline-block">
                  {errorId}
                </code>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 font-kalameh text-sm">
            EagerDevelopers - تیم توسعه وب
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
