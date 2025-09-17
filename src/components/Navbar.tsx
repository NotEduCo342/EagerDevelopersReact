import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";
import { config } from '@/config';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false); // Close menu after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Filter navigation links based on authentication state
  const getNavigationLinks = () => {
    if (isAuthenticated) {
      // Remove Login and Register links for authenticated users
      return config.navigation.filter(link => 
        link.name !== 'ورود' && link.name !== 'ثبت نام'
      );
    }
    return config.navigation;
  };

  const navigationLinks = getNavigationLinks();

  return (
    <header className="bg-sky-500 shadow-md relative z-20 font-Pelak">
      <div className="container mx-auto flex items-center justify-between p-4 text-white">
        <Link to="/" className="text-2xl font-bold">
          {config.app.name}
        </Link>
        <nav className="hidden md:flex">
          <ul className="flex items-center space-x-6">
            {navigationLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  to={link.href}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-sky-600 transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {isAuthenticated && (
              <li className="relative group">
                <div className="flex items-center space-x-2">
                  <button 
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-sky-600 transition-colors duration-300 flex items-center space-x-2"
                    title="پروفایل کاربری"
                  >
                    <FaUser size={16} />
                    <span>پروفایل</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors duration-300 flex items-center space-x-2"
                    title="خروج از حساب کاربری"
                  >
                    <FaSignOutAlt size={16} />
                    <span>خروج</span>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      <div
        className={`absolute w-full bg-sky-500 md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navigationLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.href}
                className="block text-white rounded-md px-3 py-2 text-base font-medium hover:bg-sky-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          {isAuthenticated && (
            <>
              <li>
                <button
                  className="w-full text-right block text-white rounded-md px-3 py-2 text-base font-medium hover:bg-sky-600 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUser size={16} className="ml-2" />
                  پروفایل
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-right block text-white rounded-md px-3 py-2 text-base font-medium hover:bg-red-600 flex items-center"
                >
                  <FaSignOutAlt size={16} className="ml-2" />
                  خروج
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
