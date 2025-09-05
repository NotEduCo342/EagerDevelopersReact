import React from "react";

/**
 * SimpleFooter Component - Minimal footer for non-home pages
 * 
 * A clean, minimal footer that doesn't overwhelm the content pages
 * while still providing brand presence and copyright information.
 */
const SimpleFooter: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 font-Yekan">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center gap-3">
          {/* Brand Name */}
          <h3 className="text-xl font-bold">EagerDevelopers</h3>
          
          {/* Simple Description */}
          <p className="text-gray-300 text-sm max-w-md">
            ترکیبی از خلاقیت و فناوری برای ساخت تجربه‌های دیجیتال ماندگار
          </p>
          
          {/* Copyright */}
          <div className="border-t border-gray-700 pt-3 mt-2 w-full max-w-xs">
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} EAGER DEVELOPERS - همه حقوق محفوظ است
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
