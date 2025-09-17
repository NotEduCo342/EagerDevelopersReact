import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaShieldAlt, FaClock, FaSignOutAlt, FaChartLine } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/auth.service';
import type { User } from '../types';

// Optimized animation variants - lighter animations for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

// Memoized loading component for better performance
const LoadingSpinner = React.memo(() => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-500 mx-auto"></div>
      <p className="mt-3 text-gray-600 font-Yekan text-sm">در حال بارگذاری...</p>
    </div>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize display user to prevent unnecessary re-renders
  const displayUser = useMemo(() => profileData || user, [profileData, user]);

  // Memoize date formatters for better performance
  const formatDate = useMemo(() => {
    const formatter = new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const timeFormatter = new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    return { date: formatter, dateTime: timeFormatter };
  }, []);

  // Fetch fresh profile data from backend
  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const profile = await authService.getCurrentUser();
        if (isMounted) {
          setProfileData(profile);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        if (isMounted) {
          setError('خطا در بارگذاری اطلاعات پروفایل');
          setProfileData(user);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-Yekan">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Welcome Header - Optimized for readability */}
          <motion.div variants={itemVariants} className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 font-Hilda">
              خوش آمدید! 👋
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-Yekan">
              {displayUser?.username ? `سلام ${displayUser.username} عزیز` : 'داشبورد کاربری شما'}
            </p>
            {displayUser?.isAdmin && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-medium mt-3 shadow-md"
              >
                <FaShieldAlt className="ml-1" />
                مدیر سیستم
              </motion.div>
            )}
          </motion.div>

          {/* Error Display - Enhanced styling */}
          {error && (
            <motion.div variants={itemVariants} className="mb-4">
              <div className="bg-red-50 border-r-4 border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <FaChartLine className="ml-2" />
                  <span className="font-Yekan">{error}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Dashboard Grid - Improved responsive design */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            
            {/* User Profile Card - Enhanced design */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
            >
              <div className="flex items-center mb-5">
                <div className="bg-sky-100 p-2 rounded-lg ml-3">
                  <FaUser className="text-sky-600 text-lg" />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-gray-800 font-Yekan">اطلاعات پروفایل</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="text-gray-600 font-Yekan text-sm">آدرس ایمیل:</span>
                  <span className="font-medium text-gray-800 font-Yekan break-all">{displayUser?.email}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="text-gray-600 font-Yekan text-sm">نام کاربری:</span>
                  <span className="font-medium text-gray-800 font-Yekan">{displayUser?.username}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="text-gray-600 font-Yekan text-sm">شناسه کاربری:</span>
                  <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {displayUser?.id?.substring(0, 8)}...
                  </span>
                </div>
                {displayUser?.createdAt && (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="text-gray-600 font-Yekan text-sm">تاریخ عضویت:</span>
                    <span className="text-sm text-gray-600 font-Yekan">
                      {formatDate.date.format(new Date(displayUser.createdAt))}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Account Security Card - Enhanced with better indicators */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
            >
              <div className="flex items-center mb-5">
                <div className="bg-green-100 p-2 rounded-lg ml-3">
                  <FaShieldAlt className="text-green-600 text-lg" />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-gray-800 font-Yekan">وضعیت امنیتی</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="text-gray-600 font-Yekan text-sm">تلاش‌های ناموفق ورود:</span>
                  <div className="flex items-center">
                    <span className={`font-medium font-Yekan ${(displayUser?.failedLoginAttempts || 0) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {displayUser?.failedLoginAttempts || 0}
                    </span>
                    <div className={`w-2 h-2 rounded-full ml-2 ${(displayUser?.failedLoginAttempts || 0) > 0 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="text-gray-600 font-Yekan text-sm">وضعیت حساب کاربری:</span>
                  <div className="flex items-center">
                    <span className={`font-medium font-Yekan ${displayUser?.lockedUntil ? 'text-red-600' : 'text-green-600'}`}>
                      {displayUser?.lockedUntil ? '🔒 قفل شده' : '✅ فعال'}
                    </span>
                  </div>
                </div>
                {displayUser?.lastLoginAt && (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="text-gray-600 font-Yekan text-sm">آخرین ورود:</span>
                    <span className="text-sm text-gray-600 font-Yekan">
                      {formatDate.dateTime.format(new Date(displayUser.lastLoginAt))}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Welcome Message Card - Optimized design */}
          <motion.div 
            variants={itemVariants}
            className="mt-6 bg-gradient-to-r from-sky-500 via-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center mb-4">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg ml-3">
                <FaClock className="text-white text-lg" />
              </div>
              <h2 className="text-lg md:text-xl font-bold font-Yekan">پیام خوش‌آمدگویی</h2>
            </div>
            <p className="text-blue-100 leading-relaxed font-Yekan text-sm md:text-base">
              شما با موفقیت وارد داشبورد شخصی خود شده‌اید. این سیستم از پیشرفته‌ترین تکنولوژی‌های امنیتی 
              برای حفاظت از اطلاعات شما استفاده می‌کند و تمام داده‌ها به‌صورت مستقیم از سرور دریافت می‌شوند.
            </p>
            
            {/* Quick Actions - Enhanced button */}
            <div className="flex flex-wrap gap-3 mt-6">
              <motion.button 
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-xl 
                           flex items-center transition-all duration-300 backdrop-blur-sm font-Yekan shadow-md"
              >
                <FaSignOutAlt className="ml-2" />
                خروج امن از حساب
              </motion.button>
            </div>
          </motion.div>

          {/* Success Message - Enhanced styling */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 
                     text-green-700 px-6 py-4 rounded-2xl shadow-sm"
          >
            <p className="font-medium font-Yekan">✅ ورود موفقیت‌آمیز - سیستم احراز هویت کاملاً عملیاتی است</p>
            <p className="text-sm mt-2 text-green-600 font-Yekan">
              🔗 این داشبورد اتصال مستقیم و امن به سرور را نشان می‌دهد
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
};

export default Dashboard;