// src/pages/Login.jsx

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('آدرس ایمیل نامعتبر است').required('وارد کردن ایمیل الزامی است'),
  password: Yup.string()
    .matches(/.{8,}/, 'رمز عبور باید حداقل ۸ کاراکتر باشد')
    .matches(/[A-Z]/, 'رمز عبور باید شامل حرف بزرگ باشد')
    .matches(/[a-z]/, 'رمز عبور باید شامل حرف کوچک باشد')
    .matches(/[0-9]/, 'رمز عبور باید شامل عدد باشد')
    .matches(/[^A-Za-z0-9]/, 'رمز عبور باید شامل کاراکتر خاص باشد')
    .required('وارد کردن رمز عبور الزامی است'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (values, { setSubmitting }) => {
    console.log('Login data:', values);
    alert('فرم ورود با موفقیت ارسال شد! داده‌ها را در کنسول ببینید.');
    setSubmitting(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden m-4">
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white text-right">
          <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-4">ورود به حساب کاربری</h1>
          <p className="text-center text-gray-500 mb-8">به ایگر دولوپرز خوش آمدید!</p>
          
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-bold mb-2">ایمیل</label>
                  <Field type="email" name="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"/>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 font-bold mb-2">رمز عبور</label>
                  <div className="relative">
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      // --- CHANGE IS ON THIS LINE ---
                      // Changed left-0 to right-0 to move the icon
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <PasswordStrengthMeter password={values.password} />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                
                <div className="text-left text-sm mb-6">
                  <a href="#" className="font-semibold text-sky-600 hover:text-sky-800">فراموشی رمز عبور؟</a>
                </div>

                <div className="text-center">
                  <button type="submit" disabled={isSubmitting} className="w-full bg-sky-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-sky-600 transition-colors duration-300 disabled:bg-gray-400">
                    ورود
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-6">
            <Link to="/" className="text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors">
              &larr; بازگشت به خانه
            </Link>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-cyan-400 to-sky-600 p-12 text-white flex flex-col justify-center items-center text-center">
          <Link to="/" className="text-4xl font-bold mb-4">EagerDevelopers</Link>
          <p>نوآوری در برنامه‌نویسی، از ایده تا اجرا</p>
        </div>
      </div>
    </div>
  );
};

export default Login;