import React, { useState, useEffect } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaSignInAlt, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import type { LoginFormValues } from '@/types';
import { useAuth } from '../contexts/AuthContext';
import {
  AuthPageBackground,
  AuthFormContainer,
  AuthFormField,
  AuthPasswordField,
  AuthCheckbox,
  AuthSubmitButton,
  AuthErrorDisplay,
  containerVariants,
  itemVariants
} from '../components/auth';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("آدرس ایمیل نامعتبر است")
    .required("وارد کردن ایمیل الزامی است"),
  password: Yup.string().required("وارد کردن رمز عبور الزامی است"),
  rememberMe: Yup.boolean(),
});

const Login: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error, clearError } = useAuth();

  // Handle success message from registration
  useEffect(() => {
    if (location.state?.message && location.state?.type === 'success') {
      setSuccessMessage(location.state.message);
      // Clear the state to prevent message showing on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleLogin = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ): Promise<void> => {
    setIsSubmitting(true);
    clearError();
    
    try {
      console.log("Login attempt with:", values);
      await login(values.email, values.password, values.rememberMe);
      console.log("Login successful");
      navigate('/dashboard', { replace: true }); // Updated: redirect to dashboard
    } catch (error: any) {
      console.error('Login failed:', error);
    } finally {
      setSubmitting(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" dir="rtl">
      <AuthPageBackground theme="login" />

      <motion.div
        className="container mx-auto px-6 py-8 relative z-0 min-h-screen flex items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Side - Login Form */}
            <AuthFormContainer
              title="ورود به حساب کاربری"
              subtitle="به ایگر دولوپرز خوش آمدید!"
              theme="login"
            >
              <Formik
                initialValues={{ email: "", password: "", rememberMe: false } as LoginFormValues}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
              >
                {({ isSubmitting: formikSubmitting }) => (
                  <Form className="space-y-6">
                    <AuthFormField
                      name="email"
                      type="email"
                      label="آدرس ایمیل"
                      placeholder="example@domain.com"
                      icon={FaEnvelope}
                      theme="login"
                      delay={0.9}
                    />

                    <AuthPasswordField
                      name="password"
                      label="رمز عبور"
                      placeholder="رمز عبور خود را وارد کنید"
                      theme="login"
                      delay={1.1}
                    />

                    {/* Remember Me & Forgot Password */}
                    <motion.div
                      className="flex items-center justify-between"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.25 }}
                    >
                      <AuthCheckbox
                        name="rememberMe"
                        label="مرا به خاطر بسپار"
                      />
                      <Link
                        to="#"
                        className="text-sky-600 hover:text-sky-800 font-semibold text-sm font-Pelak transition-colors duration-300"
                      >
                        فراموشی رمز عبور؟
                      </Link>
                    </motion.div>

                    {/* Success message from registration */}
                    {successMessage && (
                      <motion.div
                        className="p-4 bg-green-50 border border-green-200 rounded-lg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center">
                          <FaCheckCircle className="text-green-500 ml-3" />
                          <p className="text-green-800 font-Pelak text-sm">{successMessage}</p>
                        </div>
                      </motion.div>
                    )}

                    <AuthErrorDisplay error={error} />

                    <AuthSubmitButton
                      isSubmitting={isSubmitting}
                      isFormikSubmitting={formikSubmitting}
                      loadingText="در حال ورود..."
                      submitText="ورود به حساب کاربری"
                      icon={FaSignInAlt}
                      theme="login"
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
            </AuthFormContainer>

            {/* Right Side - Branding & Features */}
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
