import React from "react";
import Slider from "../../Components/Navber/Slider/Slider";
import ImpactMetrics from "../../Components/Navber/ImpactMetrics/ImpactMetrics";
import ButtomtoTop from "../../Components/Navber/ButtomtoTop/ButtomtoTop";

import OurProgram from "../../Components/Navber/OurProgram/OurProgram";
import RecentNews from "../../Components/Navber/BlogeSection/BlogeSection";
import OurPartners from "../../Components/Navber/OurPartners/OurPartners";
import WhoWeAre from "../../Components/Navber/WhoWeAre/WhoWeAre";
import OurActivities from "../../Components/Navber/OurActivities/OurActivities";
import FocusAreas from "../../Components/Navber/WhatWeDo/FocusAreas";

const Home = () => {
  return (
    <div>
      <Slider></Slider>

      <WhoWeAre></WhoWeAre>
      <OurProgram></OurProgram>
      <ImpactMetrics></ImpactMetrics>
      <FocusAreas></FocusAreas>

      <OurActivities></OurActivities>
      <RecentNews></RecentNews>
      <OurPartners></OurPartners>
    </div>
  );
};

export default Home;
