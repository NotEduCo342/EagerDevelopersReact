import { FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import React from "react";

// تبدیل ارقام لاتین به فارسی
const toPersianDigits = (val) =>
  String(val).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const FooterColumn = ({ title, links, id }) => (
  <nav aria-labelledby={id}>
    <h3
      id={id}
      className="font-bold text-white mb-4 text-lg"
    >
      {title}
    </h3>
    <ul>
      {links.map((link) => (
        <li key={link.name} className="mb-2">
          <a
            href={link.href}
            className="text-gray-200 hover:text-white hover:-translate-y-0.5 transition-all duration-300 block"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const defaultCompanyLinks = [
  { name: "درباره ما", href: "/about" },
  { name: "پروژه‌ها", href: "/projects" },
  { name: "فرصت‌های شغلی", href: "/careers" },
];

const defaultResourceLinks = [
  { name: "وبلاگ", href: "/blog" },
  { name: "مرکز راهنما", href: "/help" },
  { name: "تماس با ما", href: "/contact" },
];

const socialLinks = [
  { name: "توییتر", href: "#", icon: FaTwitter },
  { name: "اینستاگرام", href: "#", icon: FaInstagram },
  { name: "گیت‌هاب", href: "#", icon: FaGithub },
];

const Footer = ({
  companyLinks = defaultCompanyLinks,
  resourceLinks = defaultResourceLinks,
  brandName = "EAGER DEVELOPERS",
  tagline = "نوآوری در وب؛ یک پروژه در هر بار.",
  year = new Date().getFullYear(),
  rtl = true,
  locale = "fa",
  showLatinYear = false,
}) => {
  const yearFa = toPersianDigits(year);
  return (
    <footer
      className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-t-3xl mt-20"
      dir={rtl ? "rtl" : "ltr"}
      lang={locale}
    >
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-right">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {brandName}
            </h2>
            <p className="text-gray-200">{tagline}</p>
          </div>

          <FooterColumn
            title="شرکت"
            links={companyLinks}
            id="footer-company"
          />
          <FooterColumn
            title="منابع"
            links={resourceLinks}
            id="footer-resources"
          />
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-300 text-sm">
            {`© ${showLatinYear ? year : yearFa} ${brandName} - همه حقوق محفوظ است.`}
          </p>
          <ul className="flex items-center gap-6">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  aria-label={name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 inline-flex"
                >
                  <Icon size={20} aria-hidden="true" focusable="false" />
                  <span className="sr-only">{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
