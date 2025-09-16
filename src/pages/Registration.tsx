import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { motion, Variants } from "framer-motion";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaCheck, FaUserPlus, FaArrowLeft } from "react-icons/fa";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import type { RegistrationFormValues } from '@/types';

const RegistrationSchema = Yup.object().shape({
  username: Yup.string().required("وارد کردن نام کاربری الزامی است"),
  email: Yup.string()
    .email("آدرس ایمیل نامعتبر است")
    .required("وارد کردن ایمیل الزامی است"),
  password: Yup.string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
    .matches(/[A-Z]/, "رمز عبور باید حداقل یک حرف بزرگ انگلیسی داشته باشد")
    .matches(/[a-z]/, "رمز عبور باید حداقل یک حرف کوچک انگلیسی داشته باشد")
    .matches(/[0-9]/, "رمز عبور باید حداقل یک عدد داشته باشد")
    .matches(/[^A-Za-z0-9]/, "رمز عبور باید حداقل یک کاراکتر خاص داشته باشد")
    .required("وارد کردن رمز عبور الزامی است"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "رمزهای عبور باید مطابقت داشته باشند")
    .required("تکرار رمز عبور الزامی است"),
});

const Registration: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleRegister = async (values: RegistrationFormValues, { setSubmitting }: FormikHelpers<RegistrationFormValues>): Promise<void> => {
    setIsSubmitting(true);
    console.log("Registration form submitted with:", values);
    
    // Simulate API call
    setTimeout(() => {
      alert("Registration form submitted! Check the console for data.");
      setSubmitting(false);
      setIsSubmitting(false);
    }, 2500);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 relative overflow-hidden" dir="rtl">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-red-300/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-80 h-80 bg-gradient-to-br from-sky-200/30 to-blue-300/30 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-pink-300/20 rounded-full blur-2xl"
          animate={{
            y: [-30, 30, -30],
            x: [-15, 15, -15],
          }}
          transition={{
            duration: 18,
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
            
            {/* Left Side - Registration Form */}
            <motion.div variants={cardVariants}>
              <div className="bg-white/80 backdrop-blur-lg p-6 md:p-8 rounded-3xl shadow-2xl border border-white/20 max-w-md mx-auto lg:max-w-none">
                {/* Header */}
                <motion.div
                  className="text-center mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.h1 
                    className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent font-Hilda mb-3"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ایجاد حساب کاربری
                  </motion.h1>
                  <motion.div
                    className="w-20 h-1 bg-gradient-to-r from-orange-400 to-red-600 mx-auto mb-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                  />
                  <p className="text-gray-600 font-Pelak">
                    به جامعه توسعه‌دهندگان ما بپیوندید
                  </p>
                </motion.div>

                <Formik
                  initialValues={{
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  validationSchema={RegistrationSchema}
                  onSubmit={handleRegister}
                >
                  {({ isSubmitting: formikSubmitting, values }) => (
                    <Form className="space-y-6">
                      {/* Username Field */}
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <label className="block text-gray-700 font-bold mb-2 font-Pelak">
                          <FaUser className="inline-block ml-2 text-orange-500" />
                          نام کاربری
                        </label>
                        <Field name="username">
                          {({ field, meta }: any) => (
                            <motion.input
                              {...field}
                              type="text"
                              placeholder="نام کاربری خود را انتخاب کنید"
                              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-right font-Pelak bg-gray-50/50 ${
                                meta.touched && meta.error
                                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                  : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100'
                              }`}
                              whileFocus={{ scale: 1.02 }}
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-red-500 text-sm mt-2 font-Pelak"
                        />
                      </motion.div>

                      {/* Email Field */}
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 }}
                      >
                        <label className="block text-gray-700 font-bold mb-2 font-Pelak">
                          <FaEnvelope className="inline-block ml-2 text-orange-500" />
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
                                  : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100'
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
                        transition={{ delay: 1.3 }}
                      >
                        <label className="block text-gray-700 font-bold mb-2 font-Pelak">
                          <FaLock className="inline-block ml-2 text-orange-500" />
                          رمز عبور
                        </label>
                        <Field name="password">
                          {({ field, meta }: any) => (
                            <motion.input
                              {...field}
                              type="password"
                              placeholder="رمز عبور قوی انتخاب کنید"
                              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-right font-Pelak bg-gray-50/50 ${
                                meta.touched && meta.error
                                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                  : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100'
                              }`}
                              whileFocus={{ scale: 1.02 }}
                            />
                          )}
                        </Field>
                        <PasswordStrengthMeter password={values.password} />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm mt-2 font-Pelak"
                        />
                      </motion.div>

                      {/* Confirm Password Field */}
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.5 }}
                      >
                        <label className="block text-gray-700 font-bold mb-2 font-Pelak">
                          <FaCheck className="inline-block ml-2 text-orange-500" />
                          تکرار رمز عبور
                        </label>
                        <Field name="confirmPassword">
                          {({ field, meta }: any) => (
                            <motion.input
                              {...field}
                              type="password"
                              placeholder="رمز عبور را مجدداً وارد کنید"
                              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-right font-Pelak bg-gray-50/50 ${
                                meta.touched && meta.error
                                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                  : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100'
                              }`}
                              whileFocus={{ scale: 1.02 }}
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-red-500 text-sm mt-2 font-Pelak"
                        />
                      </motion.div>

                      {/* Submit Button */}
                      <motion.div
                        className="pt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.7 }}
                      >
                        <motion.button
                          type="submit"
                          disabled={formikSubmitting || isSubmitting}
                          className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 font-Pelak disabled:opacity-50 disabled:cursor-not-allowed"
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
                              در حال ثبت نام...
                            </motion.div>
                          ) : (
                            <>
                              <FaUserPlus className="inline-block ml-2" />
                              ایجاد حساب کاربری
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
                  transition={{ delay: 1.9 }}
                >
                  <p className="text-gray-600 font-Pelak">
                    قبلاً حساب کاربری دارید؟{" "}
                    <Link
                      to="/login"
                      className="font-semibold text-orange-600 hover:text-orange-800 transition-colors duration-300"
                    >
                      همین الان وارد شوید
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

            {/* Right Side - Benefits & Features */}
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
                    className="text-6xl font-extrabold bg-gradient-to-r from-orange-600 to-red-700 bg-clip-text text-transparent font-Hilda block mb-4"
                  >
                    EagerDevelopers
                  </Link>
                  <p className="text-xl text-gray-600 font-Pelak leading-relaxed max-w-md mx-auto">
                    به جامعه ما بپیوندید و از مزایای ویژه برخوردار شوید
                  </p>
                </motion.div>

                {/* Benefits */}
                <motion.div
                  className="space-y-6 mt-12"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    { icon: "🎯", title: "هدفمند و تخصصی", desc: "محتوای آموزشی متناسب با نیاز شما" },
                    { icon: "🤝", title: "جامعه فعال", desc: "ارتباط با دیگر توسعه‌دهندگان" },
                    { icon: "📈", title: "رشد مهارت‌ها", desc: "بهبود مستمر و یادگیری عملی" },
                    { icon: "🎁", title: "منابع رایگان", desc: "دسترسی به پروژه‌ها و کدهای نمونه" },
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/30"
                      variants={itemVariants}
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-4xl mb-3">{benefit.icon}</div>
                      <h3 className="text-xl font-bold text-gray-800 font-Hilda mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 font-Pelak">
                        {benefit.desc}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Security Note */}
                <motion.div
                  className="bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-2xl border border-orange-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.1 }}
                >
                  <div className="text-2xl mb-2">🔒</div>
                  <p className="text-sm text-gray-700 font-Pelak">
                    اطلاعات شما با بالاترین استانداردهای امنیتی محافظت می‌شود
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Registration;
