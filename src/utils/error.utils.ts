/**
 * Error Message Utility
 * Converts backend errors to user-friendly Persian messages with English technical info
 * Philosophy: Technical details in English, user messages in Persian
 */

interface ErrorResponse {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

interface ProcessedError {
  userMessage: string; // Persian message for users
  technicalInfo: string; // English technical details
  displayMessage: string; // Combined message for display
}

/**
 * Process authentication errors into Persian user messages
 */
export const processAuthError = (error: any): ProcessedError => {
  const status = error?.status || error?.response?.status;
  const code = error?.code || error?.response?.data?.error;
  const message = error?.message || error?.response?.data?.message || 'Unknown error';

  let userMessage = '';
  let technicalInfo = '';

  // Handle specific error cases
  switch (status) {
    case 400:
      if (message.includes('Password must contain')) {
        userMessage = 'رمز عبور باید شامل حروف بزرگ، کوچک، عدد و کاراکتر خاص باشد';
        technicalInfo = `API Error 400: ${message}`;
      } else if (message.includes('already exists') || message.includes('already taken')) {
        userMessage = 'این ایمیل قبلاً ثبت شده است. لطفاً ایمیل دیگری استفاده کنید';
        technicalInfo = `API Error 400: ${message}`;
      } else if (message.includes('validation')) {
        userMessage = 'اطلاعات وارد شده نامعتبر است. لطفاً دوباره تلاش کنید';
        technicalInfo = `API Error 400: ${message}`;
      } else {
        userMessage = 'اطلاعات وارد شده صحیح نمی‌باشد';
        technicalInfo = `API Error 400: ${message}`;
      }
      break;

    case 401:
      userMessage = 'ایمیل یا رمز عبور اشتباه است';
      technicalInfo = `API Error 401: ${message}`;
      break;

    case 423: // Account locked
      userMessage = 'حساب کاربری شما به دلیل تلاش‌های ناموفق قفل شده است. لطفاً ۳۰ دقیقه دیگر تلاش کنید';
      technicalInfo = `API Error 423: ${message}`;
      break;

    case 429: // Rate limited
      if (message.includes('login')) {
        userMessage = 'تعداد تلاش‌های ورود بیش از حد مجاز است. لطفاً ۱۵ دقیقه صبر کنید';
        technicalInfo = `API Error 429: Login rate limit exceeded`;
      } else if (message.includes('register')) {
        userMessage = 'تعداد تلاش‌های ثبت نام بیش از حد مجاز است. لطفاً ۱ ساعت صبر کنید';
        technicalInfo = `API Error 429: Registration rate limit exceeded`;
      } else {
        userMessage = 'تعداد درخواست‌ها بیش از حد مجاز است. لطفاً کمی صبر کنید';
        technicalInfo = `API Error 429: ${message}`;
      }
      break;

    case 500:
      userMessage = 'خطای سرور رخ داده است. لطفاً دوباره تلاش کنید';
      technicalInfo = `API Error 500: ${message}`;
      break;

    default:
      // Handle network errors and unknown errors
      if (code === 'NETWORK_ERROR' || !status) {
        userMessage = 'خطا در برقراری ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید';
        technicalInfo = `Network Error: ${message}`;
      } else {
        userMessage = 'خطای غیرمنتظره‌ای رخ داده است. لطفاً دوباره تلاش کنید';
        technicalInfo = `API Error ${status || 'Unknown'}: ${message}`;
      }
  }

  // Combine user message with technical info for display
  const displayMessage = `${userMessage}\n(${technicalInfo})`;

  return {
    userMessage,
    technicalInfo,
    displayMessage
  };
};

/**
 * Get simplified user message (Persian only)
 */
export const getUserMessage = (error: any): string => {
  return processAuthError(error).userMessage;
};

/**
 * Get full error message with technical details
 */
export const getFullErrorMessage = (error: any): string => {
  return processAuthError(error).displayMessage;
};