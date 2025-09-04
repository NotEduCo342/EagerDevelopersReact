/**
 * Static Application Constants
 * These values rarely change and are not environment-specific
 */

// Application Information
export const APP_INFO = {
  name: 'EagerDevelopers',
  title: 'طراحی وب با خانم بهبودی',
  description: 'مدرس و توسعه دهنده وب در قزوین',
  canonicalUrl: 'https://www.eagerdevelopers.ir',
  version: '1.0.0',
} as const;

// Contact Information
export const CONTACT_INFO = {
  email: 'info@eagerdevelopers.ir',
  phone: '1234567-028',
  address: 'قزوین، چهارراه ولیعصر، جهاد دانشگاهی',
  title: 'تماس با ما',
  subtitle: 'سوالی دارید یا می‌خواهید با ما همکاری کنید؟ پیامی برای ما بفرستید!',
  mapCoordinates: {
    lat: 36.2797,
    lng: 50.0034,
  },
} as const;

// Social Media Links
export const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/eagerdevelopers',
    icon: 'instagram',
  },
  {
    name: 'Telegram',
    url: 'https://t.me/eagerdevelopers',
    icon: 'telegram',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/eagerdevelopers',
    icon: 'github',
  },
] as const;

// Navigation Links
export const NAV_LINKS = [
  { name: 'خانه', href: '/' },
  { name: 'پروژه‌ها', href: '/projects' },
  { name: 'تماس با ما', href: '/contact' },
  { name: 'ورود', href: '/login' },
  { name: 'ثبت نام', href: '/register' },
] as const;

// Form Configuration
export const FORM_CONFIG = {
  validation: {
    email: {
      required: 'وارد کردن ایمیل الزامی است',
      invalid: 'آدرس ایمیل نامعتبر است',
    },
    password: {
      required: 'وارد کردن رمز عبور الزامی است',
      minLength: 'رمز عبور باید حداقل ۸ کاراکتر باشد',
      mismatch: 'رمزهای عبور باید مطابقت داشته باشند',
    },
  },
  successMessage: 'از پیام شما متشکریم! برای مشاهده داده‌ها، کنسول را بررسی کنید.',
  submitText: 'ارسال پیام',
  fields: {
    name: {
      label: 'نام',
      placeholder: 'نام خود را وارد کنید',
    },
    email: {
      label: 'ایمیل',
      placeholder: 'آدرس ایمیل خود را وارد کنید',
    },
    message: {
      label: 'پیام شما',
      placeholder: 'پیام خود را اینجا بنویسید...',
    },
    password: {
      label: 'رمز عبور',
      placeholder: 'رمز عبور خود را وارد کنید',
    },
    confirmPassword: {
      label: 'تکرار رمز عبور',
      placeholder: 'رمز عبور را مجدداً وارد کنید',
    },
  },
  classes: {
    label: 'block text-gray-700 font-bold mb-2',
    input: 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500',
    textarea: 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 resize-vertical',
    button: 'bg-sky-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-sky-600 transition-colors duration-300',
    error: 'text-red-500 text-sm mt-1',
    success: 'text-green-500 text-sm mt-1',
  },
} as const;

// SEO Configuration
export const SEO_CONFIG = {
  keywords: 'طراحی وب, توسعه وب, خانم بهبودی, آموزش برنامه‌نویسی, قزوین, React, HTML, CSS, JavaScript',
  author: 'EagerDevelopers',
  description: 'به وب‌سایت رسمی خانم بهبودی، مدرس و متخصص طراحی و توسعه وب در قزوین خوش آمدید. در این وب‌سایت با جدیدترین تکنولوژی‌های برنامه‌نویسی آشنا شوید.',
  ogImage: 'https://www.eagerdevelopers.ir/images/og-image.jpg',
  twitterCard: 'summary_large_image',
} as const;
