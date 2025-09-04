import React from "react";
import { FaArrowUp } from "react-icons/fa";

interface ScrollToTopButtonProps {
  isVisible: boolean;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ isVisible }) => {
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 left-8 p-3 rounded-full bg-sky-800 text-white shadow-lg
        hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50
        transition-opacity duration-300
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      aria-label="Scroll to top"
    >
      <FaArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;
