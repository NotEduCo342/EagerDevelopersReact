import type { Variants } from "framer-motion";

/**
 * Centralized Animation Variants for Auth Pages
 * Purpose: Keep animations consistent and DRY across login/registration
 * Philosophy: Single source of truth for motion behaviors
 */

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export const itemVariants: Variants = {
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

export const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const fieldVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay },
  }),
};

export const buttonVariants = {
  hover: { scale: 1.02, y: -2 },
  tap: { scale: 0.98 },
};

export const submitButtonVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.02, y: -2 },
  tap: { scale: 0.98 },
};

export const errorVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// Background animation variants
export const backgroundVariants = {
  animate: {
    background: [
      "radial-gradient(circle at 20% 80%, #3b82f6 0%, transparent 50%)",
      "radial-gradient(circle at 80% 20%, #06b6d4 0%, transparent 50%)",
      "radial-gradient(circle at 40% 40%, #8b5cf6 0%, transparent 50%)",
      "radial-gradient(circle at 20% 80%, #3b82f6 0%, transparent 50%)",
    ],
  },
  transition: {
    duration: 15,
    repeat: Infinity,
    ease: "easeInOut",
  },
};