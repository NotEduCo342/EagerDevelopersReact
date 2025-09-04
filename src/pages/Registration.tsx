import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import type { RegistrationFormValues } from '@/types';

const RegistrationSchema = Yup.object().shape({
  username: Yup.string().required("وارد کردن نام کاربری الزامی است"),
  email: Yup.string()
    .email("آدرس ایمیل نامعتبر است")
    .required("وارد کردن ایمیل الزامی است"),
  password: Yup.string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
    .required("وارد کردن رمز عبور الزامی است"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "رمزهای عبور باید مطابقت داشته باشند")
    .required("تکرار رمز عبور الزامی است"),
});

const Registration: React.FC = () => {
  const handleRegister = (values: RegistrationFormValues, { setSubmitting }: FormikHelpers<RegistrationFormValues>): void => {
    console.log("Registration form submitted with:", values);
    alert("Registration form submitted! Check the console for data.");
    setSubmitting(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden m-4">
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white text-right">
          <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
            ایجاد حساب کاربری
          </h1>
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
            {({ isSubmitting, values }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    نام کاربری
                  </label>
                  <Field
                    type="text"
                    name="username"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    ایمیل
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    رمز عبور
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <PasswordStrengthMeter password={values.password} />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    تکرار رمز عبور
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sky-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-sky-600 transition-colors duration-300 disabled:bg-gray-400"
                  >
                    {isSubmitting ? "در حال ثبت نام..." : "ثبت نام"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              قبلاً حساب کاربری ساخته‌اید؟{" "}
              <Link
                to="/login"
                className="font-semibold text-sky-600 hover:text-sky-800"
              >
                وارد شوید
              </Link>
            </p>
          </div>
          <div className="text-center mt-4">
            <Link
              to="/"
              className="text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors"
            >
              &larr; بازگشت به خانه
            </Link>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-cyan-400 to-sky-600 p-12 text-white flex flex-col justify-center items-center text-center">
          <Link to="/" className="text-4xl font-bold mb-4">
            EagerDevelopers
          </Link>
          <p>به جامعه توسعه‌دهندگان ما بپیوندید.</p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
