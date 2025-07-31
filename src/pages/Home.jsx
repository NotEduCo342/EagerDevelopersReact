// src/pages/Home.jsx

import React from 'react';
import Hero from '../components/Hero';
import TechStack from '../components/TechStack';

const Home = () => {
  // SEO Content
  const pageTitle = "طراحی وب با خانم بهبودی - مدرس و توسعه دهنده وب در قزوین";
  const pageDescription = "به وب‌سایت رسمی خانم بهبودی، مدرس و متخصص طراحی و توسعه وب در قزوین خوش آمدید. در این وب‌سایت با جدیدترین تکنولوژی‌های برنامه‌نویسی آشنا شوید.";
  const canonicalUrl = "https://www.eagerdevelopers.ir"; // IMPORTANT: Replace with your actual domain
  const ogImageUrl = `${canonicalUrl}/images/og-image.jpg`; // IMPORTANT: Create and place this image

  return (
    <>
      {/* --- SEO & META TAGS --- */}
      {/* Basic SEO */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content="طراحی وب, توسعه وب, خانم بهبودی, آموزش برنامه‌نویسی, قزوین, React, HTML, CSS, JavaScript" />
      <meta name="author" content="EagerDevelopers" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImageUrl} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={ogImageUrl} />
      
      {/* Page Content */}
      <Hero />
      <TechStack />
    </>
  );
};

export default Home;