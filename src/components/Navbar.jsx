// src/components/Navbar.jsx

import React from 'react';

const Navbar = () => {
  const navLinks = [
    {
      title: 'خانه', // Home
      href: '/',
      submenu: [
        { title: 'درباره ما', href: '/about' }, // About Us
        { title: 'ویژگی‌ها', href: '/features' }, // Features
      ],
    },
    {
      title: 'پروژه‌ها', // Projects
      href: '/projects',
      submenu: [
        { title: 'پروژه ۱', href: '/projects/1' },
        { title: 'پروژه ۲', href: '/projects/2' },
      ],
    },
    { title: 'تماس با ما', href: '/contact' }, // Contact Us
    { title: 'ورود', href: '/login' }, // Login
  ];

  return (
    // Add z-20 to the header to ensure it's above other content, but below the dropdown
    <header className="bg-sky-500 shadow-md relative z-20">
      <div className="container mx-auto flex items-center justify-between p-4 text-white">
        <a href="/" className="text-2xl font-bold">
          EagerDevelopers
        </a>
        <nav>
          <ul className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <li key={link.title} className="relative group">
                <a
                  href={link.href}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-sky-600 transition-colors duration-300"
                >
                  {link.title}
                </a>

                {link.submenu && (
                  <ul
                    className="
                      absolute top-full left-0 mt-2 p-2 w-max rounded-md shadow-lg
                      bg-black/20 backdrop-blur-lg
                      opacity-0 scale-95 invisible
                      group-hover:opacity-100 group-hover:scale-100 group-hover:visible
                      transition-all duration-300 ease-in-out
                      z-30 /* Ensures dropdown is on top of everything */
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
      </div>
    </header>
  );
};

export default Navbar;