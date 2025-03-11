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

const Home = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Get the saved scroll position
    const savedScrollPosition = sessionStorage.getItem("homeScrollPosition");

    // Check if there's a saved scroll position and prevent overwriting it with 0
    if (savedScrollPosition !== null && isFirstRender.current) {
      const position = parseInt(savedScrollPosition, 10);
      if (position > 0) {
        window.scrollTo(0, position);
      }
    }

    isFirstRender.current = false; // Prevents resetting on re-renders

    // Function to save scroll position
    const handleScroll = () => {
      sessionStorage.setItem("homeScrollPosition", window.scrollY);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  return (
    <div>
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
