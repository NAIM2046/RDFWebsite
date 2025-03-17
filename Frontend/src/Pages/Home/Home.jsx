import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import Slider from "../../Components/Navber/Slider/Slider";
import ImpactMetrics from "../../Components/Navber/ImpactMetrics/ImpactMetrics";
import OurProgram from "../../Components/Navber/OurProgram/OurProgram";
import RecentNews from "../../Components/Navber/BlogeSection/BlogeSection";
import OurPartners from "../../Components/Navber/OurPartners/OurPartners";
import WhoWeAre from "../../Components/Navber/WhoWeAre/WhoWeAre";
import OurActivities from "../../Components/Navber/OurActivities/OurActivities";
import FocusAreas from "../../Components/Navber/WhatWeDo/FocusAreas";
import { Helmet } from "react-helmet-async";
import useRDFStore from "../../storage/useRDFstorage";

const Home = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);
  const { isLoading } = useRDFStore();

  useEffect(() => {
    // Delay the scroll restoration to ensure the page has fully loaded
    const savedScrollPosition = sessionStorage.getItem("homeScrollPosition");

    if (savedScrollPosition !== null && isFirstRender.current) {
      const position = parseInt(savedScrollPosition, 10);
      if (position > 0) {
        setTimeout(() => {
          window.scrollTo(0, position);
        }, 300); // Delay to ensure smooth scrolling
      }
    }

    isFirstRender.current = false;

    // Function to save scroll position
    const handleScroll = () => {
      sessionStorage.setItem("homeScrollPosition", window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  return (
    <div>
      <Helmet>
        <title> RDF-Home </title>
      </Helmet>
      <Slider />
      <WhoWeAre />
      <OurProgram />
      <ImpactMetrics />
      <FocusAreas />
      <OurActivities />
      <RecentNews />
      <OurPartners />
    </div>
  );
};

export default Home;
