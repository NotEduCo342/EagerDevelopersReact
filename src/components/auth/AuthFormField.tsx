import React from 'react';
import { motion } from 'framer-motion';
import { Field, ErrorMessage } from 'formik';
import type { IconType } from 'react-icons';
import { fieldVariants } from './AuthAnimations';
import { type AuthTheme, getThemeClasses } from './AuthThemes';

interface AuthFormFieldProps {
  name: string;
  type?: string;
  label: string;
  placeholder: string;
  icon: IconType;
  theme: AuthTheme;
  delay?: number;
  className?: string;
}

/**
 * Theme-aware Auth Form Field Component
 * Purpose: DRY form field with validation and theme-consistent styling
 * Philosophy: One component for all text inputs with unique theme identity
 */
const AuthFormField: React.FC<AuthFormFieldProps> = ({
  name,
  type = 'text',
  label,
  placeholder,
  icon: Icon,
  theme,
  delay = 0,
  className = '',
}) => {
  const themeConfig = getThemeClasses(theme);
  
  return (
    <motion.div
      custom={delay}
      variants={fieldVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      <label className="block text-gray-700 font-bold mb-2 font-Pelak">
        <Icon className={`inline-block ml-2 text-${themeConfig.accentColor}`} />
        {label}
      </label>
      <Field name={name}>
        {({ field, meta }: any) => (
          <motion.input
            {...field}
            type={type}
            placeholder={placeholder}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-right font-Pelak bg-gray-50/50 ${
              meta.touched && meta.error
                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                : `border-gray-200 ${themeConfig.focusBorder} focus:ring-4 ${themeConfig.focusRing}`
            }`}
            whileFocus={{ scale: 1.02 }}
          />
        )}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-2 font-Pelak"
      />
    </motion.div>
  );
};

export default AuthFormField;