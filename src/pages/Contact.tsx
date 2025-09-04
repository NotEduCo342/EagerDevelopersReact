import React, { useState } from "react";
import type { ContactFormValues, ChangeHandler, SubmitHandler } from '@/types';
import { config } from '@/config';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormValues>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange: ChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit: SubmitHandler = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    alert(config.forms.successMessage);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            {config.contact.title}
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            {config.contact.subtitle}
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-right">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className={config.forms.classes.label}
              >
                {config.forms.fields.name.label}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={config.forms.fields.name.placeholder}
                value={formData.name}
                onChange={handleChange}
                className={config.forms.classes.input}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className={config.forms.classes.label}
              >
                {config.forms.fields.email.label}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={config.forms.fields.email.placeholder}
                value={formData.email}
                onChange={handleChange}
                className={config.forms.classes.input}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className={config.forms.classes.label}
              >
                {config.forms.fields.message.label}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder={config.forms.fields.message.placeholder}
                value={formData.message}
                onChange={handleChange}
                className={config.forms.classes.textarea}
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className={config.forms.classes.button}
              >
                {config.forms.submitText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
