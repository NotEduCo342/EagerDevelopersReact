// src/components/Footer.jsx

import React from 'react';
// Import the icons we need from react-icons
import { FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

const Footer = () => {
  // A helper component for footer columns to keep the code clean
  const FooterColumn = ({ title, links }) => (
    <div>
      <h3 className="font-bold text-white mb-4">{title}</h3>
      <ul>
        {links.map((link) => (
          <li key={link.name} className="mb-2">
            {/* UPDATED THIS LINE */}
            <a href={link.href} className="text-gray-200 hover:text-white hover:-translate-y-0.5 transition-all duration-300 block">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Careers', href: '/careers' },
  ];

  const resourceLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-t-3xl mt-20">
      <div className="container mx-auto px-8 py-12">
        {/* Top section with columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-right">
          {/* Brand/Logo Column (aligned left in RTL) */}
          <div className="md:col-span-1 lg:col-span-1">
              {/* Using a standard font for now, can be customized later */}
            <h2 className="text-3xl font-bold text-white mb-2">EAGER DEVELOPERS</h2>
            <p className="text-gray-200">Innovating the web, one project at a time.</p>
          </div>

          {/* Spacer for medium screens */}
          <div className="hidden md:block lg:hidden"></div>

          {/* Link Columns */}
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
        </div>

        {/* Bottom section with copyright and social links */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EagerDevelopers. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-6">
            {/* UPDATED THESE 3 LINES */}
            <a href="#" className="text-gray-300 hover:text-white hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-300 hover:text-white hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"><FaInstagram size={20} /></a>
            <a href="#" className="text-gray-300 hover:text-white hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"><FaGithub size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;