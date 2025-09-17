import React from 'react';
import { motion } from 'framer-motion';
import { Field } from 'formik';

interface AuthCheckboxProps {
  name: string;
  label: string;
  delay?: number;
  className?: string;
}

/**
 * Animated Checkbox Component
 * Purpose: Reusable checkbox for auth forms
 * Philosophy: Simple, focused component
 */
const AuthCheckbox: React.FC<AuthCheckboxProps> = ({
  name,
  label,
  delay = 0,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className={className}
    >
      <Field name={name}>
        {({ field }: any) => (
          <label className="flex items-center cursor-pointer">
            <input
              {...field}
              type="checkbox"
              checked={field.value}
              className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 focus:ring-2"
            />
            <span className="mr-2 text-sm text-gray-700 font-Pelak">
              {label}
            </span>
          </label>
        )}
      </Field>
    </motion.div>
  );
};

export default AuthCheckbox;