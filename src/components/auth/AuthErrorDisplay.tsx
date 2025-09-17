import React from 'react';
import { motion } from 'framer-motion';
import { errorVariants } from './AuthAnimations';

interface AuthErrorDisplayProps {
  error: string | null;
  className?: string;
}

/**
 * Error Message Display Component
 * Purpose: Consistent error messaging across auth forms
 * Philosophy: Single component for error handling
 */
const AuthErrorDisplay: React.FC<AuthErrorDisplayProps> = ({
  error,
  className = '',
}) => {
  if (!error) return null;

  return (
    <motion.div
      variants={errorVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-Pelak ${className}`}
    >
      {error}
    </motion.div>
  );
};

export default AuthErrorDisplay;