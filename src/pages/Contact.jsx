// src/pages/Contact.jsx

import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Translated the alert message
    alert('از پیام شما متشکریم! برای مشاهده داده‌ها، کنسول را بررسی کنید.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        {/* Translated Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">تماس با ما</h1>
          <p className="text-lg text-gray-600 mt-4">سوالی دارید یا می‌خواهید با ما همکاری کنید؟ پیامی برای ما بفرستید!</p>
        </div>

        {/* Added text-right for better RTL alignment */}
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-right">
          <form onSubmit={handleSubmit}>
            {/* Translated Labels */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">نام</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">ایمیل</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">پیام شما</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              ></textarea>
            </div>

            <div className="text-center">
              {/* Translated Button Text */}
              <button
                type="submit"
                className="bg-sky-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-sky-600 transition-colors duration-300"
              >
                ارسال پیام
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;