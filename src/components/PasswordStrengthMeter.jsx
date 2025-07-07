// src/components/PasswordStrengthMeter.jsx

import React, { useMemo } from 'react';
// Import check and times icons
import { FaCheck, FaTimes } from 'react-icons/fa';

// Define the criteria for a strong password
const passwordCriteria = [
  { id: 1, text: 'حداقل ۸ کاراکتر', regex: /.{8,}/ },
  { id: 2, text: 'یک حرف بزرگ (A-Z)', regex: /[A-Z]/ },
  { id: 3, text: 'یک حرف کوچک (a-z)', regex: /[a-z]/ },
  { id: 4, text: 'یک عدد (0-9)', regex: /[0-9]/ },
  { id: 5, text: 'یک کاراکتر خاص (!@#$...)', regex: /[^A-Za-z0-9]/ },
];

const PasswordStrengthMeter = ({ password }) => {
  // useMemo will only re-calculate when the password changes, which is efficient
  const strength = useMemo(() => {
    let score = 0;
    passwordCriteria.forEach(criterion => {
      if (criterion.regex.test(password)) {
        score++;
      }
    });
    return score;
  }, [password]);

  const getBarProperties = () => {
    switch (strength) {
      case 1: return { width: '20%', color: 'bg-red-500' };
      case 2: return { width: '40%', color: 'bg-red-500' };
      case 3: return { width: '60%', color: 'bg-yellow-500' };
      case 4: return { width: '80%', color: 'bg-green-500' };
      case 5: return { width: '100%', color: 'bg-green-500' };
      default: return { width: '0%', color: '' };
    }
  };

  const { width, color } = getBarProperties();

  return (
    <div className="mt-2 space-y-3">
      {/* The Progress Bar */}
      <div className="bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${color}`}
          style={{ width: width }}
        ></div>
      </div>

      {/* The Validation Checklist */}
      <ul className="space-y-1">
        {passwordCriteria.map((criterion) => {
          const isValid = criterion.regex.test(password);
          return (
            <li key={criterion.id} className={`flex items-center text-xs transition-colors duration-300 ${isValid ? 'text-green-600' : 'text-gray-500'}`}>
              {isValid ? <FaCheck className="w-4 h-4 mr-2" /> : <FaTimes className="w-4 h-4 mr-2 text-gray-300" />}
              {criterion.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordStrengthMeter;