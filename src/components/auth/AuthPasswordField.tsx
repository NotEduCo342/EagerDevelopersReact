import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Field, ErrorMessage } from 'formik';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { fieldVariants } from './AuthAnimations';
import { type AuthTheme, getThemeClasses } from './AuthThemes';
import PasswordStrengthMeter from '../PasswordStrengthMeter';

interface AuthPasswordFieldProps {
  name: string;
  label: string;
  placeholder: string;
  theme: AuthTheme;
  delay?: number;
  className?: string;
  showStrengthMeter?: boolean;
  value?: string; // For strength meter
}

/**
 * Theme-aware Password Field with Strength Meter
 * Purpose: Secure password input with optional strength validation
 * Philosophy: Enhanced security UX with theme consistency
 */
const AuthPasswordField: React.FC<AuthPasswordFieldProps> = ({
  name,
  label,
  placeholder,
  theme,
  delay = 0,
  className = '',
  showStrengthMeter = false,
  value = '',
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
        <FaLock className={`inline-block ml-2 text-${themeConfig.accentColor}`} />
        {label}
      </label>
      <div className="relative">
        <Field name={name}>
          {({ field, meta }: any) => (
            <motion.input
              {...field}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              className={`w-full px-4 py-3 pl-12 border-2 rounded-xl focus:outline-none transition-all duration-300 text-right font-Pelak bg-gray-50/50 ${
                meta.touched && meta.error
                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                  : `border-gray-200 ${themeConfig.focusBorder} focus:ring-4 ${themeConfig.focusRing}`
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
        name={name}
        component="div"
        className="text-red-500 text-sm mt-2 font-Pelak"
      />
      
      {showStrengthMeter && value && (
        <div className="mt-2">
          <PasswordStrengthMeter password={value} />
        </div>
      )}
    </motion.div>
  );
};

export default AuthPasswordField;