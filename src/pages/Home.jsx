import Hero from "../components/Hero";
import TechStack from "../components/TechStack";
import ProgrammingInfoTree from "../components/ProgrammingInfoTree";
import IntroductionSection from "../components/IntroductionSection";

const Home = () => {
  const pageTitle = "طراحی وب با خانم بهبودی - مدرس و توسعه دهنده وب در قزوین";
  const pageDescription =
    "به وب‌سایت رسمی خانم بهبودی، مدرس و متخصص طراحی و توسعه وب در قزوین خوش آمدید. در این وب‌سایت با جدیدترین تکنولوژی‌های برنامه‌نویسی آشنا شوید.";
  const canonicalUrl = "https://www.eagerdevelopers.ir";
  const ogImageUrl = `${canonicalUrl}/images/og-image.jpg`;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta
        name="keywords"
        content="طراحی وب, توسعه وب, خانم بهبودی, آموزش برنامه‌نویسی, قزوین, React, HTML, CSS, JavaScript"
      />
      <meta name="author" content="EagerDevelopers" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImageUrl} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={ogImageUrl} />

      <Hero />
      <TechStack />
      <ProgrammingInfoTree />
      <IntroductionSection />
    </>
  );
};

export default Home;
