import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useRDFStore from "../../storage/useRDFstorage";

// Lazy load components for performance
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

  // Scroll restoration
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("homeScrollPosition");
    if (savedScroll && isFirstRender.current) {
      const pos = parseInt(savedScroll, 10);
      const checkLoaded = () => {
        if (document.readyState === "complete") {
          window.scrollTo({ top: pos, behavior: "smooth" });
          clearInterval(interval);
        }
      };
      const interval = setInterval(checkLoaded, 100);
    }
    isFirstRender.current = false;

    let scrollTimeout;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        sessionStorage.setItem("homeScrollPosition", window.scrollY);
      }, 200);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [location]);

  // Structured Data with sameAs for social profiles
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Resource Development Foundation (RDF)",
    url: "https://rdfbd.org",
    logo: "https://rdfbd.org/assets/navber/rdflogo.png",
    description:
      "RDF is dedicated to creating sustainable change through education, healthcare, and community development programs in Bangladesh.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Road #12, Pisciculture Housing Society, Block-Kha, Adabor",
      addressLocality: "Dhaka",
      postalCode: "1207",
      addressCountry: "Bangladesh",
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61556311631080",
      "https://www.linkedin.com/in/resource-development-foundation-rdf-2ba4832b5/",
      "https://www.youtube.com/channel/UCf9PTB7a6ejQn7I1u53IzMA",
      "https://www.instagram.com/rdfbangladesh/",
      "https://twitter.com/rdf_bd",
    ],
  };

  return (
    <div className="home-page ">
      <Helmet>
        <title>
          Resource Development Foundation(RDF) | Empowering Communities in
          Bangladesh
        </title>
        <meta
          name="description"
          content="RDF is dedicated to sustainable development through education, healthcare, and community programs in Bangladesh."
        />
        <meta
          name="keywords"
          content="NGO, sustainable development, community programs, education, healthcare, poverty alleviation, Bangladesh"
        />
        {/* Open Graph */}
        <meta
          property="og:title"
          content="Resource Development Foundation(RDF) |  Bangladesh"
        />
        <meta
          property="og:description"
          content="Empowering communities through sustainable development initiatives"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rdfbd.org" />
        <meta
          property="og:image"
          content="https://rdfbd.org/social-share-image.jpg"
        />
        <link rel="canonical" href="https://rdfbd.org" />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(organizationStructuredData)}
        </script>
      </Helmet>

      <React.Suspense
        fallback={<div className="loading-spinner">Loading content...</div>}
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
