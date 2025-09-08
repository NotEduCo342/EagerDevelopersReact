import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, ArrowLeftIcon, FolderIcon } from '@heroicons/react/24/outline';
import SimpleFooter from '../components/SimpleFooter';

const NotFound = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 pt-16">
        <div className="max-w-2xl mx-auto text-center">
     
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
           
          >
            <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 leading-none">
              404
            </h1>
          </motion.div>

 
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-Pelak"  dir='rtl'>
              صفحه‌ای که دنبالش می‌گردید پیدا نشد!
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-Pelak" dir='rtl'>
              متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا ممکن است منتقل شده باشد.
              <br />
              نگران نباشید، می‌توانید از لینک‌های زیر به بخش‌های مختلف سایت بروید.
            </p>
          </motion.div>


          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link
              to="/"
              className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-['Pelak']"
            >
              <HomeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              صفحه اصلی
            </Link>

            <Link
              to="/projects"
              className="group flex items-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl font-['Pelak']"
            >
              <FolderIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              مشاهده پروژه‌ها
            </Link>

            <Link
              to="/contact"
              className="group flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-['Pelak'] z-2"
            >
              <ArrowLeftIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              تماس با ما
            </Link>
          </motion.div>


          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 z-1">
              <div className="absolute top-5 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-60 animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-indigo-200 rounded-full opacity-60 animate-pulse delay-500"></div>
            </div>
            
            <div className="text-sm text-gray-500 font-Pelak">
              کد خطا: 404 | صفحه یافت نشد
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
