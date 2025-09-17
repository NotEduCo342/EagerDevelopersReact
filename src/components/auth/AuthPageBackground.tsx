import React from 'react';
import { motion } from 'framer-motion';
import { backgroundVariants } from './AuthAnimations';
import { type AuthTheme, getThemeClasses } from './AuthThemes';

/**
 * Animated Background Component for Auth Pages
 * Purpose: Theme-aware animated gradient background
 * Philosophy: Preserve unique visual identities while reusing logic
 */

interface AuthPageBackgroundProps {
  theme: AuthTheme;
}

const AuthPageBackground: React.FC<AuthPageBackgroundProps> = ({ theme }) => {
  const themeConfig = getThemeClasses(theme);
  
  if (theme === 'registration') {
    // Registration theme - warm colors with complex animations
    return (
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${themeConfig.backgroundGradient}`} />
        
        {/* Registration-specific animated elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className={`absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br ${themeConfig.decorativeElements.primary} rounded-full blur-3xl`}
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 w-80 h-80 bg-gradient-to-br from-sky-200/30 to-blue-300/30 rounded-full blur-3xl"
            animate={{
              scale: [1.3, 1, 1.3],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className={`absolute top-1/3 right-1/4 w-40 h-40 bg-gradient-to-br ${themeConfig.decorativeElements.secondary} rounded-full blur-2xl`}
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    );
  }
  
  // Login theme - cool colors with simpler animations
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-10"
        variants={backgroundVariants}
        animate="animate"
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Static Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${themeConfig.backgroundGradient}`} />
      
      {/* Decorative Shapes */}
      <div className={`absolute top-20 right-20 w-64 h-64 bg-gradient-to-br ${themeConfig.decorativeElements.primary} rounded-full blur-3xl`} />
      <div className={`absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br ${themeConfig.decorativeElements.secondary} rounded-full blur-3xl`} />
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br ${themeConfig.decorativeElements.tertiary} rounded-full blur-3xl`} />
    </div>
  );
};

export default AuthPageBackground;