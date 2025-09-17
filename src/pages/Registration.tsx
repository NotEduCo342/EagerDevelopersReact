import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaUserPlus, FaArrowLeft } from "react-icons/fa";
import type { RegistrationFormValues } from '@/types';
import { useAuth } from '../contexts/AuthContext';
import {
  AuthPageBackground,
  AuthFormContainer,
  AuthFormField,
  AuthPasswordField,
  AuthSubmitButton,
  AuthErrorDisplay,
  containerVariants,
  itemVariants
} from '../components/auth';

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
  const navigate = useNavigate();
  const { register, error, clearError } = useAuth();

  const handleRegister = async (
    values: RegistrationFormValues,
    { setSubmitting }: FormikHelpers<RegistrationFormValues>
  ): Promise<void> => {
    setIsSubmitting(true);
    clearError();
    
    try {
      console.log("Registration attempt with:", values);
      await register(values.username, values.email, values.password, values.confirmPassword);
      console.log("Registration successful");
      
      // After successful registration, redirect to login with success message
      navigate('/login', { 
        replace: true, 
        state: { 
          message: 'ثبت نام با موفقیت انجام شد! اکنون وارد حساب کاربری خود شوید.',
          type: 'success'
        }
      });
    } catch (error: any) {
      console.error('Registration failed:', error);
    } finally {
      setSubmitting(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" dir="rtl">
      <AuthPageBackground theme="registration" />

      <motion.div
        className="container mx-auto px-6 py-8 relative z-0 min-h-screen flex items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Side - Registration Form */}
            <AuthFormContainer
              title="ایجاد حساب کاربری"
              subtitle="به خانواده ایگر دولوپرز بپیوندید!"
              theme="registration"
            >
              <Formik
                initialValues={{ 
                  username: "", 
                  email: "", 
                  password: "", 
                  confirmPassword: "" 
                } as RegistrationFormValues}
                validationSchema={RegistrationSchema}
                onSubmit={handleRegister}
              >
                {({ isSubmitting: formikSubmitting, values }) => (
                  <Form className="space-y-6">
                    <AuthFormField
                      name="username"
                      type="text"
                      label="نام کاربری"
                      placeholder="نام کاربری خود را وارد کنید"
                      icon={FaUser}
                      theme="registration"
                      delay={0.7}
                    />

                    <AuthFormField
                      name="email"
                      type="email"
                      label="آدرس ایمیل"
                      placeholder="example@domain.com"
                      icon={FaEnvelope}
                      theme="registration"
                      delay={0.9}
                    />

                    <AuthPasswordField
                      name="password"
                      label="رمز عبور"
                      placeholder="رمز عبور قوی انتخاب کنید"
                      theme="registration"
                      delay={1.1}
                      showStrengthMeter={true}
                      value={values.password}
                    />

                    <AuthPasswordField
                      name="confirmPassword"
                      label="تکرار رمز عبور"
                      placeholder="رمز عبور را دوباره وارد کنید"
                      theme="registration"
                      delay={1.3}
                    />

                    <AuthErrorDisplay error={error} />

                    <AuthSubmitButton
                      isSubmitting={isSubmitting}
                      isFormikSubmitting={formikSubmitting}
                      loadingText="در حال ایجاد حساب..."
                      submitText="ایجاد حساب کاربری"
                      icon={FaUserPlus}
                      theme="registration"
                      delay={1.5}
                    />
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
            </AuthFormContainer>

            {/* Right Side - Benefits & Features */}
            <motion.div className="hidden lg:block" variants={itemVariants}>
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