import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { motion, Variants } from "framer-motion";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaSignInAlt, FaArrowLeft } from "react-icons/fa";
import type { LoginFormValues } from '@/types';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("آدرس ایمیل نامعتبر است")
    .required("وارد کردن ایمیل الزامی است"),
  password: Yup.string().required("وارد کردن رمز عبور الزامی است"),
});

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleLogin = async (values: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>): Promise<void> => {
    setIsSubmitting(true);
    console.log("Login form submitted with:", values);
    
    // Simulate API call
    setTimeout(() => {
      alert("Login form submitted! Check the console for data.");
      setSubmitting(false);
      setIsSubmitting(false);
    }, 2000);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 relative overflow-hidden" dir="rtl">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-10 -right-10 w-96 h-96 bg-gradient-to-br from-sky-200/30 to-blue-300/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-red-300/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-cyan-200/20 to-sky-300/20 rounded-full blur-2xl"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="container mx-auto px-6 py-8 relative z-0 min-h-screen flex items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Side - Login Form */}
            <motion.div variants={cardVariants}>
              <div className="bg-white/80 backdrop-blur-lg p-6 md:p-8 rounded-3xl shadow-2xl border border-white/20 max-w-md mx-auto lg:max-w-none">
                {/* Header */}
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.h1 
                    className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-sky-600 via-blue-700 to-sky-800 bg-clip-text text-transparent font-Hilda mb-3"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ورود به حساب کاربری
                  </motion.h1>
                  <motion.div
                    className="w-20 h-1 bg-gradient-to-r from-sky-400 to-blue-600 mx-auto mb-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                  />
                  <p className="text-gray-600 font-Pelak">
                    به ایگر دولوپرز خوش آمدید! 
                  </p>
                </motion.div>

                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={LoginSchema}
                  onSubmit={handleLogin}
                >
                  {({ isSubmitting: formikSubmitting }) => (
                    <Form className="space-y-6">
                      {/* Email Field */}
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <label className="block text-gray-700 font-bold mb-2 font-Pelak">
                          <FaEnvelope className="inline-block ml-2 text-sky-500" />
                          آدرس ایمیل
                        </label>
                        <Field name="email">
                          {({ field, meta }: any) => (
                            <motion.input
                              {...field}
                              type="email"
                              placeholder="example@domain.com"
                              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-right font-Pelak bg-gray-50/50 ${
                                meta.touched && meta.error
                                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                  : 'border-gray-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100'
                              }`}
                              whileFocus={{ scale: 1.02 }}
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm mt-2 font-Pelak"
                        />
                      </motion.div>

                      {/* Password Field */}
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 }}
                      >
                        <label className="block text-gray-700 font-bold mb-2 font-Pelak">
                          <FaLock className="inline-block ml-2 text-sky-500" />
                          رمز عبور
                        </label>
                        <div className="relative">
                          <Field name="password">
                            {({ field, meta }: any) => (
                              <motion.input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder="رمز عبور خود را وارد کنید"
                                className={`w-full px-4 py-3 pl-12 border-2 rounded-xl focus:outline-none transition-all duration-300 text-right font-Pelak bg-gray-50/50 ${
                                  meta.touched && meta.error
                                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                    : 'border-gray-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100'
                                }`}
                                whileFocus={{ scale: 1.02 }}
                              />
                            )}
                          </Field>
                          <motion.button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                          </motion.button>
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm mt-2 font-Pelak"
                        />
                      </motion.div>

                      {/* Forgot Password */}
                      <motion.div
                        className="text-left"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3 }}
                      >
                        <Link
                          to="#"
                          className="text-sky-600 hover:text-sky-800 font-semibold font-Pelak transition-colors duration-300 inline-flex items-center"
                        >
                          فراموشی رمز عبور؟
                        </Link>
                      </motion.div>

                      {/* Submit Button */}
                      <motion.div
                        className="pt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                      >
                        <motion.button
                          type="submit"
                          disabled={formikSubmitting || isSubmitting}
                          className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 font-Pelak disabled:opacity-50 disabled:cursor-not-allowed"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isSubmitting ? (
                            <motion.div className="flex items-center justify-center">
                              <motion.div
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full ml-2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              در حال ورود...
                            </motion.div>
                          ) : (
                            <>
                              <FaSignInAlt className="inline-block ml-2" />
                              ورود به حساب کاربری
                            </>
                          )}
                        </motion.button>
                      </motion.div>
                    </Form>
                  )}
                </Formik>

                {/* Footer Links */}
                <motion.div
                  className="mt-8 space-y-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7 }}
                >
                  <p className="text-gray-600 font-Pelak">
                    حساب کاربری ندارید؟{" "}
                    <Link
                      to="/register"
                      className="font-semibold text-sky-600 hover:text-sky-800 transition-colors duration-300"
                    >
                      همین الان ثبت نام کنید
                    </Link>
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center text-gray-500 hover:text-gray-700 font-medium font-Pelak transition-colors duration-300"
                  >
                    <FaArrowLeft className="ml-2" />
                    بازگشت به صفحه اصلی
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Branding & Features */}
            <motion.div
              className="hidden lg:block"
              variants={itemVariants}
            >
              <div className="text-center space-y-8">
                {/* Logo & Brand */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <Link 
                    to="/" 
                    className="text-6xl font-extrabold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent font-Hilda block mb-4"
                  >
                    EagerDevelopers
                  </Link>
                  <p className="text-xl text-gray-600 font-Pelak leading-relaxed max-w-md mx-auto">
                    نوآوری در برنامه‌نویسی، از ایده تا اجرا
                  </p>
                </motion.div>

                {/* Features */}
                <motion.div
                  className="space-y-6 mt-12"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    { icon: "🚀", title: "پروژه‌های منحصر به فرد", desc: "دسترسی به پورتفولیو کامل پروژه‌ها" },
                    { icon: "💡", title: "ایده‌های نوآورانه", desc: "الهام از آخرین ترندهای تکنولوژی" },
                    { icon: "🔧", title: "ابزارهای پیشرفته", desc: "آشنایی با جدیدترین فناوری‌ها" },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/30"
                      variants={itemVariants}
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-4xl mb-3">{feature.icon}</div>
                      <h3 className="text-xl font-bold text-gray-800 font-Hilda mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 font-Pelak">
                        {feature.desc}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
