import React from "react";
import Slider from "../../Components/Navber/Slider/Slider";
import ImpactMetrics from "../../Components/Navber/ImpactMetrics/ImpactMetrics";
import ButtomtoTop from "../../Components/Navber/ButtomtoTop/ButtomtoTop";
import WhatWeDo from "../../Components/Navber/WhatWeDo/WhatWeDo";
import OurProgram from "../../Components/Navber/OurProgram/OurProgram";
import RecentNews from "../../Components/Navber/RecentNews/RecentNews";
import OurPartners from "../../Components/Navber/OurPartners/OurPartners";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <ImpactMetrics></ImpactMetrics>
      <OurProgram></OurProgram>
      <WhatWeDo></WhatWeDo>
      <RecentNews></RecentNews>
      <OurPartners></OurPartners>
      <ButtomtoTop></ButtomtoTop>
    </div>
  );
};

export default Home;
