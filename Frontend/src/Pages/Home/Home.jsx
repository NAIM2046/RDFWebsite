import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useRDFStore from "../../storage/useRDFstorage";

// Lazy load components for better performance
const Slider = React.lazy(() =>
  import("../../Components/Navber/Slider/Slider")
);
const ImpactMetrics = React.lazy(() =>
  import("../../Components/Navber/ImpactMetrics/ImpactMetrics")
);
const OurProgram = React.lazy(() =>
  import("../../Components/Navber/OurProgram/OurProgram")
);
const RecentNews = React.lazy(() =>
  import("../../Components/Navber/BlogeSection/BlogeSection")
);
const OurPartners = React.lazy(() =>
  import("../../Components/Navber/OurPartners/OurPartners")
);
const WhoWeAre = React.lazy(() =>
  import("../../Components/Navber/WhoWeAre/WhoWeAre")
);
const OurActivities = React.lazy(() =>
  import("../../Components/Navber/OurActivities/OurActivities")
);
const FocusAreas = React.lazy(() =>
  import("../../Components/Navber/WhatWeDo/FocusAreas")
);

const Home = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);
  const { isLoading } = useRDFStore();

  useEffect(() => {
    // Scroll restoration with intersection observer for better reliability
    const savedScrollPosition = sessionStorage.getItem("homeScrollPosition");

    if (savedScrollPosition !== null && isFirstRender.current) {
      const position = parseInt(savedScrollPosition, 10);
      if (position > 0) {
        const checkContentLoaded = () => {
          if (document.readyState === "complete") {
            window.scrollTo({
              top: position,
              behavior: "smooth",
            });
            clearInterval(loadCheckInterval);
          }
        };
        const loadCheckInterval = setInterval(checkContentLoaded, 100);
      }
    }

    isFirstRender.current = false;

    // Throttled scroll position save
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        sessionStorage.setItem("homeScrollPosition", window.scrollY);
      }, 200);
    };

    let scrollTimeout;
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [location]);

  // Structured data for better SEO
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Resource Development Foundation",
    url: window.location.href,
    logo: "https://yourwebsite.com/logo.png",
    description: "Description of your foundation's mission and work",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Foundation St",
      addressLocality: "City",
      addressRegion: "State",
      postalCode: "12345",
      addressCountry: "Country",
    },
  };

  return (
    <div className="home-page">
      <Helmet>
        <title>
          Resource Development Foundation | Empowering Communities Through
          Sustainable Development
        </title>
        <meta
          name="description"
          content="Resource Development Foundation is dedicated to creating sustainable change through education, healthcare, and community development programs. Join us in making a difference."
        />
        <meta
          name="keywords"
          content="NGO, sustainable development, community programs, education, healthcare, poverty alleviation"
        />
        <meta
          property="og:title"
          content="Resource Development Foundation | Home"
        />
        <meta
          property="og:description"
          content="Empowering communities through sustainable development initiatives"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta
          property="og:image"
          content="https://yourwebsite.com/social-share-image.jpg"
        />
        <script type="application/ld+json">
          {JSON.stringify(organizationStructuredData)}
        </script>
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <React.Suspense
        fallback={<div className="loading-spinner">Loading...</div>}
      >
        <Slider />
        <WhoWeAre />

        <ImpactMetrics />
        <FocusAreas />
        <OurActivities />
        <RecentNews />
        <OurPartners />
      </React.Suspense>
    </div>
  );
};

export default Home;
