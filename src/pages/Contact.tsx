import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { FaUser, FaEnvelope, FaComment, FaPaperPlane, FaPhone, FaMapMarkerAlt, FaClock, FaInstagram, FaTelegram, FaGithub } from "react-icons/fa";
import SimpleFooter from "../components/SimpleFooter";
import type { ContactFormValues, ChangeHandler, SubmitHandler } from '@/types';
import { config } from '@/config';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange: ChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit: SubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form data submitted:", formData);
      alert(config.forms.successMessage);
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
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
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 relative overflow-hidden" dir="rtl">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-sky-200/30 to-blue-300/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-red-300/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <motion.div
        className="container mx-auto px-6 py-20 relative z-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-sky-600 via-blue-700 to-sky-800 bg-clip-text text-transparent font-Hilda mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {config.contact.title}
          </motion.h1>
          <motion.div
            className="w-32 h-1.5 bg-gradient-to-r from-sky-400 to-blue-600 mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto font-Pelak leading-relaxed"
            variants={itemVariants}
          >
            {config.contact.subtitle}
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          
          {/* Contact Form - 2/3 width */}
          <motion.div
            className="lg:col-span-2"
            variants={cardVariants}
          >
            <div className="bg-white/80 backdrop-blur-lg p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-800 font-Hilda mb-2">
                  ارسال پیام
                </h2>
                <p className="text-gray-600 font-Pelak">
                  پیام خود را برای ما ارسال کنید، در سریع‌ترین زمان پاسخ خواهیم داد
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-gray-700 font-bold mb-3 font-Pelak text-lg">
                    <FaUser className="inline-block ml-2 text-sky-500" />
                    {config.forms.fields.name.label}
                  </label>
                  <motion.input
                    type="text"
                    name="name"
                    placeholder={config.forms.fields.name.placeholder}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all duration-300 text-right font-Pelak text-lg bg-gray-50/50"
                    whileFocus={{ scale: 1.02 }}
                    required
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  <label className="block text-gray-700 font-bold mb-3 font-Pelak text-lg">
                    <FaEnvelope className="inline-block ml-2 text-sky-500" />
                    {config.forms.fields.email.label}
                  </label>
                  <motion.input
                    type="email"
                    name="email"
                    placeholder={config.forms.fields.email.placeholder}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all duration-300 text-right font-Pelak text-lg bg-gray-50/50"
                    whileFocus={{ scale: 1.02 }}
                    required
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <label className="block text-gray-700 font-bold mb-3 font-Pelak text-lg">
                    <FaComment className="inline-block ml-2 text-sky-500" />
                    {config.forms.fields.message.label}
                  </label>
                  <motion.textarea
                    name="message"
                    rows={6}
                    placeholder={config.forms.fields.message.placeholder}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all duration-300 text-right font-Pelak text-lg bg-gray-50/50 resize-none"
                    whileFocus={{ scale: 1.02 }}
                    required
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  className="text-center pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-4 px-12 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 font-Pelak text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    animate={isSubmitting ? { rotate: [0, 360] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {isSubmitting ? (
                      <motion.div className="flex items-center justify-center">
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full ml-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        در حال ارسال...
                      </motion.div>
                    ) : (
                      <>
                        <FaPaperPlane className="inline-block ml-2" />
                        {config.forms.submitText}
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Contact Info Sidebar - 1/3 width */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            {/* Contact Details Card */}
            <motion.div
              className="bg-gradient-to-br from-sky-500 to-blue-600 p-8 rounded-3xl shadow-2xl text-white"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold mb-6 font-Hilda">اطلاعات تماس</h3>
              
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-xl ml-4">
                    <FaPhone className="text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold font-Pelak">تماس تلفنی</p>
                    <p className="text-sky-100 font-Pelak">{config.contact.phone}</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-xl ml-4">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold font-Pelak">ایمیل</p>
                    <p className="text-sky-100 font-Pelak">{config.contact.email}</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-xl ml-4 mt-1">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold font-Pelak">آدرس</p>
                    <p className="text-sky-100 font-Pelak leading-relaxed">{config.contact.address}</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-xl ml-4">
                    <FaClock className="text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold font-Pelak">ساعات کاری</p>
                    <p className="text-sky-100 font-Pelak">شنبه تا چهارشنبه: ۹ تا ۱۷</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Social Media Card */}
            <motion.div
              className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/20"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-bold mb-6 text-gray-800 font-Hilda">
                شبکه‌های اجتماعی
              </h3>
              
              <div className="space-y-4">
                {config.social.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="text-2xl ml-4">
                      {social.icon === 'instagram' && <FaInstagram className="text-pink-500" />}
                      {social.icon === 'telegram' && <FaTelegram className="text-blue-500" />}
                      {social.icon === 'github' && <FaGithub className="text-gray-700" />}
                    </div>
                    <span className="font-Pelak text-gray-700 group-hover:text-sky-600 transition-colors">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Simple Footer */}
      <div dir="ltr">
        <SimpleFooter />
      </div>
    </div>
  );
};

export default Contact;
