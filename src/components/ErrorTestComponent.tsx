import React, { useState } from 'react';

/**
 * ErrorTestComponent - A testing component for demonstrating error boundaries
 * This component allows developers to manually trigger errors to test the error boundary system
 */
const ErrorTestComponent: React.FC = () => {
  const [shouldError, setShouldError] = useState(false);
  const [errorType, setErrorType] = useState<'render' | 'async' | 'network'>('render');

  if (shouldError && errorType === 'render') {
    throw new Error('تست خطای رندر: این خطا عمداً ایجاد شده است!');
  }

  const triggerAsyncError = async () => {
    if (errorType === 'async') {
      throw new Error('تست خطای async: خطای ناهمگام!');
    }
  };

  const triggerNetworkError = () => {
    if (errorType === 'network') {
      fetch('/nonexistent-endpoint')
        .then(() => {
          // This won't be reached
        })
        .catch(() => {
          throw new Error('تست خطای شبکه: درخواست ناموفق!');
        });
    }
  };

  const handleErrorTrigger = () => {
    setShouldError(true);
    
    if (errorType === 'async') {
      triggerAsyncError();
    } else if (errorType === 'network') {
      triggerNetworkError();
    }
    // For 'render' errors, the component will re-render and throw
  };

  return (
    <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg" dir="rtl">
      <h3 className="text-lg font-bold text-yellow-800 font-kalameh mb-4">
        🧪 آزمایش سیستم Error Boundary
      </h3>
      
      <p className="text-yellow-700 font-kalameh mb-4">
        این کامپوننت برای تست سیستم خطایابی طراحی شده است. در محیط توسعه از آن استفاده کنید.
      </p>

      <div className="mb-4">
        <label className="block text-yellow-800 font-kalameh mb-2">
          نوع خطا:
        </label>
        <select
          value={errorType}
          onChange={(e) => setErrorType(e.target.value as 'render' | 'async' | 'network')}
          className="w-full p-2 border rounded font-kalameh"
        >
          <option value="render">خطای رندر (Render Error)</option>
          <option value="async">خطای ناهمگام (Async Error)</option>
          <option value="network">خطای شبکه (Network Error)</option>
        </select>
      </div>

      <button
        onClick={handleErrorTrigger}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-kalameh"
      >
        🚨 ایجاد خطا
      </button>

      <div className="mt-4 text-sm text-yellow-600 font-kalameh">
        <strong>توجه:</strong> بعد از کلیک روی دکمه، ErrorBoundary باید خطا را بگیرد و رابط کاربری مناسب نمایش دهد.
      </div>
    </div>
  );
};

export default ErrorTestComponent;
