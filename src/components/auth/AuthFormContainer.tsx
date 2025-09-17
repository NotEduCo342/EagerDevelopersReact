import React from 'react';
import { motion } from 'framer-motion';
import { cardVariants } from './AuthAnimations';
import { type AuthTheme, getThemeClasses } from './AuthThemes';

interface AuthFormContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  theme: AuthTheme;
  className?: string;
}

/**
 * Theme-aware Form Container Component
 * Purpose: Consistent form layout with theme support
 * Philosophy: Preserve unique visual identities while reusing structure
 */
const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  children,
  title,
  subtitle,
  theme,
  className = '',
}) => {
  const themeConfig = getThemeClasses(theme);
  
  return (
    <motion.div variants={cardVariants} className={className}>
      <div className="bg-white/80 backdrop-blur-lg p-6 md:p-8 rounded-3xl shadow-2xl border border-white/20 max-w-md mx-auto lg:max-w-none">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.h1 
            className={`text-3xl md:text-4xl font-extrabold bg-gradient-to-r ${themeConfig.primaryColor} bg-clip-text text-transparent font-Hilda mb-3`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {title}
          </motion.h1>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-sky-400 to-blue-600 mx-auto mb-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
          <p className="text-gray-600 font-Pelak">
            {subtitle}
          </p>
        </motion.div>

        {/* Form Content */}
        {children}
      </div>
    </motion.div>
  );
};

export default AuthFormContainer;