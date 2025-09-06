import type { Project } from '@/types';

export const projectData: Project[] = [
  {
    id: "eagerdevelopers-website",
    addres: "https://my-filimo.vercel.app/",
    title: "فیلیمو",
    description:
      "طراحی و پیاده‌سازی نسخه کلون وب‌سایت فیلیمو با تمرکز بر رابط کاربری مدرن، ریسپانسیو و بهینه. این پروژه با استفاده از React و Tailwind CSS توسعه داده شده و شامل بخش‌های اصلی همچون صفحه اصلی، دسته‌بندی‌ها و جزئیات محتوا می‌باشد.",
    video: "/videos/filimo.webm",
    imageUrl: "/images/projects/filimo.webp",
    tags: ["React", "Tailwind CSS", "Vite"],
  },
  {
    id: "personal-portfolio",
    addres: "https://mcdonald-fastfood.vercel.app/",
    title: "سفارش آنلاین پیتزا",
    description:
      "پیاده‌سازی یک وب‌اپلیکیشن مدرن برای سفارش آنلاین پیتزا با قابلیت شخصی‌سازی کامل. کاربران می‌توانند با استفاده از قابلیت درگ‌ و دراپ مواد اولیه دلخواه را روی پیتزا اضافه یا حذف کنند، سفارش خود را ثبت کرده و جمع مبلغ نهایی را مشاهده کنند. این پروژه با React  توسعه یافته و کاملاً ریسپانسیو است.",
    video: "/videos/pizza.webm",
    imageUrl: "/images/projects/pizza.webp",
    tags: ["React", "Vite"],
  },
  {
    id: "ecommerce-platform",
    addres: "https://armin.eagerdevelopers.ir/",
    title: "فریز گیم",
    description:
      "بازطراحی حرفه‌ای وب‌سایت خبری و آموزشی در حوزه گیم فارسی با بهره‌گیری از فناوری‌های مدرن. این پروژه شامل بخش‌هایی جامع همچون ویدیو گیم، تحلیل بازی‌ها، مقالات، آموزش‌های تخصصی و معرفی جدیدترین تجربیات گیمینگ است.",
    video: "/videos/freezgame.webm",
    imageUrl: "/images/projects/freezgame.webp",
    tags: ["HTML", "CSS"],
  },
];
