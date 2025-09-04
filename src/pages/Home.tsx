import React from "react";
import Hero from "../components/Hero";
import TechStack from "../components/TechStack";
import ProgrammingInfoTree from "../components/ProgrammingInfoTree";
import IntroductionSection from "../components/IntroductionSection";
import Footer from "../components/Footer";
import { config } from '@/config';

const Home: React.FC = () => {
  const pageTitle = "طراحی وب با خانم بهبودی - مدرس و توسعه دهنده وب در قزوین";
  const pageDescription = config.seo.description;
  const canonicalUrl = config.app.canonicalUrl;
  const ogImageUrl = config.seo.ogImage;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta
        name="keywords"
        content={config.seo.keywords}
      />
      <meta name="author" content={config.seo.author} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImageUrl} />

      <meta property="twitter:card" content={config.seo.twitterCard} />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={ogImageUrl} />

      <Hero />
      <TechStack />
      <ProgrammingInfoTree />
      <IntroductionSection />
       <Footer />
    </>
  );
};

export default Home;
