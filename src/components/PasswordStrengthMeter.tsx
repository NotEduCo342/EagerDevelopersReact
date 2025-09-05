import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { FaCheck, FaTimes } from "react-icons/fa";
import type { PasswordStrengthMeterProps, PasswordCriterion } from '@/types';

const passwordCriteria: PasswordCriterion[] = [
  { id: 1, text: "حداقل ۸ کاراکتر", regex: /.{8,}/ },
  { id: 2, text: "یک حرف بزرگ (A-Z)", regex: /[A-Z]/ },
  { id: 3, text: "یک حرف کوچک (a-z)", regex: /[a-z]/ },
  { id: 4, text: "یک عدد (0-9)", regex: /[0-9]/ },
  { id: 5, text: "یک کاراکتر خاص (!@#$...)", regex: /[^A-Za-z0-9]/ },
];

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const strength = useMemo(() => {
    let score = 0;
    passwordCriteria.forEach((criterion) => {
      if (criterion.regex.test(password)) {
        score++;
      }
    });
    return score;
  }, [password]);

  const getStrengthInfo = (): { width: string; colors: string[]; label: string; textColor: string } => {
    switch (strength) {
      case 0:
        return { 
          width: "0%", 
          colors: ["from-gray-300", "to-gray-300"], 
          label: "", 
          textColor: "text-gray-500" 
        };
      case 1:
        return { 
          width: "20%", 
          colors: ["from-red-500", "to-red-600"], 
          label: "خیلی ضعیف", 
          textColor: "text-red-600" 
        };
      case 2:
        return { 
          width: "40%", 
          colors: ["from-red-400", "to-orange-500"], 
          label: "ضعیف", 
          textColor: "text-orange-600" 
        };
      case 3:
        return { 
          width: "60%", 
          colors: ["from-yellow-400", "to-orange-400"], 
          label: "متوسط", 
          textColor: "text-yellow-600" 
        };
      case 4:
        return { 
          width: "80%", 
          colors: ["from-green-400", "to-green-500"], 
          label: "قوی", 
          textColor: "text-green-600" 
        };
      case 5:
        return { 
          width: "100%", 
          colors: ["from-green-500", "to-emerald-600"], 
          label: "خیلی قوی", 
          textColor: "text-green-700" 
        };
      default:
        return { 
          width: "0%", 
          colors: ["from-gray-300", "to-gray-300"], 
          label: "", 
          textColor: "text-gray-500" 
        };
    }
  };

  const { width, colors, label, textColor } = getStrengthInfo();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div 
      className="mt-4 space-y-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700 font-Pelak">
            قدرت رمز عبور
          </span>
          {strength > 0 && (
            <motion.span 
              className={`text-sm font-bold ${textColor} font-Pelak`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {label}
            </motion.span>
          )}
        </div>
        
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
          <motion.div
            className={`h-full bg-gradient-to-r ${colors.join(" ")} rounded-full shadow-sm`}
            initial={{ width: "0%" }}
            animate={{ width }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              type: "spring",
              stiffness: 100
            }}
          />
        </div>
      </div>

      {/* Criteria List */}
      <motion.div 
        className="grid grid-cols-1 gap-2"
        variants={containerVariants}
      >
        {passwordCriteria.map((criterion, index) => {
          const isValid = criterion.regex.test(password);
          return (
            <motion.div
              key={criterion.id}
              className={`flex items-center text-sm transition-all duration-300 p-2 rounded-lg ${
                isValid 
                  ? "text-green-700 bg-green-50 border border-green-200" 
                  : "text-gray-500 bg-gray-50 border border-gray-200"
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                backgroundColor: isValid ? "rgb(240 253 244)" : "rgb(249 250 251)"
              }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.div
                className={`flex items-center justify-center w-5 h-5 rounded-full ml-3 ${
                  isValid 
                    ? "bg-green-500 text-white" 
                    : "bg-gray-300 text-gray-500"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: index * 0.05 + 0.2,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <motion.div
                  key={isValid ? 'check' : 'times'}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isValid ? (
                    <FaCheck className="w-3 h-3" />
                  ) : (
                    <FaTimes className="w-3 h-3" />
                  )}
                </motion.div>
              </motion.div>
              <span className="font-Pelak font-medium">
                {criterion.text}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Security Tip */}
      {strength >= 4 && (
        <motion.div
          className="flex items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className="text-green-600 text-xl ml-3"
            initial={{ rotate: -180 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            🔒
          </motion.div>
          <div>
            <p className="text-sm font-semibold text-green-800 font-Pelak">
              عالی! رمز عبور شما امن است
            </p>
            <p className="text-xs text-green-600 font-Pelak mt-1">
              این رمز عبور در برابر حملات معمول محافظت خوبی ارائه می‌دهد
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PasswordStrengthMeter;
