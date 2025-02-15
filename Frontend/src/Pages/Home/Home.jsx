import React from "react";
import Slider from "../../Components/Navber/Slider/Slider";
import ImpactMetrics from "../../Components/Navber/ImpactMetrics/ImpactMetrics";
import ButtomtoTop from "../../Components/Navber/ButtomtoTop/ButtomtoTop";
import WhatWeDo from "../../Components/Navber/WhatWeDo/WhatWeDo";
import OurProgram from "../../Components/Navber/OurProgram/OurProgram";
import RecentNews from "../../Components/Navber/RecentNews/RecentNews";
import OurPartners from "../../Components/Navber/OurPartners/OurPartners";
import WhoWeAre from "../../Components/Navber/WhoWeAre/WhoWeAre";
import OurActivities from "../../Components/Navber/OurActivities/OurActivities";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <ImpactMetrics></ImpactMetrics>
      <OurProgram></OurProgram>
      <WhatWeDo></WhatWeDo>
      <WhoWeAre></WhoWeAre>
      <OurActivities></OurActivities>
      <RecentNews></RecentNews>
      <OurPartners></OurPartners>
    </div>
  );
};

export default Home;
