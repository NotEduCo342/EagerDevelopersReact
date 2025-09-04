import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { config } from '@/config';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="bg-sky-500 shadow-md relative z-20 font-Pelak">
      <div className="container mx-auto flex items-center justify-between p-4 text-white">
        <Link to="/" className="text-2xl font-bold">
          {config.app.name}
        </Link>
        <nav className="hidden md:flex">
          <ul className="flex items-center space-x-6">
            {config.navigation.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  to={link.href}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-sky-600 transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
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
          {config.navigation.map((link) => (
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
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
