import React from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import { submitButtonVariants } from './AuthAnimations';
import { type AuthTheme, getThemeClasses } from './AuthThemes';

interface AuthSubmitButtonProps {
  isSubmitting: boolean;
  isFormikSubmitting: boolean;
  loadingText: string;
  submitText: string;
  icon: IconType;
  theme: AuthTheme;
  delay?: number;
  className?: string;
}

/**
 * Theme-aware Animated Submit Button Component
 * Purpose: Reusable submit button with loading state and theme support
 * Philosophy: Consistent behavior with unique visual identity per theme
 */
const AuthSubmitButton: React.FC<AuthSubmitButtonProps> = ({
  isSubmitting,
  isFormikSubmitting,
  loadingText,
  submitText,
  icon: Icon,
  theme,
  delay = 0,
  className = '',
}) => {
  const themeConfig = getThemeClasses(theme);
  
  return (
    <motion.div
      variants={submitButtonVariants}
      initial="initial"
      animate="animate"
      transition={{ delay }}
      className={`pt-4 ${className}`}
    >
      <motion.button
        type="submit"
        disabled={isFormikSubmitting || isSubmitting}
        className={`w-full bg-gradient-to-r ${themeConfig.primaryColor} text-white font-bold py-3 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 font-Pelak disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gradient-to-r hover:${themeConfig.primaryHover}`}
        variants={submitButtonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        {isSubmitting ? (
          <motion.div className="flex items-center justify-center">
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full ml-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            {loadingText}
          </motion.div>
        ) : (
          <>
            <Icon className="inline-block ml-2" />
            {submitText}
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

export default AuthSubmitButton;