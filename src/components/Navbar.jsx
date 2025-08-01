import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      title: 'خانه',
      href: '/',
      submenu: [
        { title: 'درباره ما', href: '/about' },
        { title: 'ویژگی‌ها', href: '/features' },
      ],
    },
    {
      title: 'پروژه‌ها',
      href: '/projects',
      submenu: [
        { title: 'پروژه ۱', href: '/projects/1' },
        { title: 'پروژه ۲', href: '/projects/2' },
      ],
    },
    { title: 'تماس با ما', href: '/contact' },
    { title: 'ورود', href: '/login' },
  ];

  return (
    <header className="bg-sky-500 shadow-md relative z-20">
      <div className="container mx-auto flex items-center justify-between p-4 text-white">
        <Link to="/" className="text-2xl font-bold">
          EagerDevelopers
        </Link>
        <nav className="hidden md:flex">
          <ul className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <li key={link.title} className="relative group">
                <Link
                  to={link.href}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-sky-600 transition-colors duration-300"
                >
                  {link.title}
                </Link>
                {link.submenu && (
                  <ul
                    className="
                      absolute top-full left-0 mt-2 p-2 w-max rounded-md shadow-lg
                      bg-black/20 backdrop-blur-lg
                      opacity-0 scale-95 invisible
                      group-hover:opacity-100 group-hover:scale-100 group-hover:visible
                      group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:visible
                      transition-all duration-300 ease-in-out z-30
                    "
                  >
                    {link.submenu.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.href}
                          className="block w-full text-right px-4 py-2 rounded-md text-sm text-white hover:bg-sky-700/50"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
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
      <div className={`absolute w-full bg-sky-500 md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <li key={link.title}>
              <Link to={link.href} className="block text-white rounded-md px-3 py-2 text-base font-medium hover:bg-sky-600">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;