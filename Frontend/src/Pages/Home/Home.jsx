import React from "react";
import Slider from "../../Components/Navber/Slider/Slider";
import ImpactMetrics from "../../Components/Navber/ImpactMetrics/ImpactMetrics";
import ButtomtoTop from "../../Components/Navber/ButtomtoTop/ButtomtoTop";
import WhatWeDo from "../../Components/Navber/WhatWeDo/WhatWeDo";
import OurProgram from "../../Components/Navber/OurProgram/OurProgram";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <ImpactMetrics></ImpactMetrics>
      <OurProgram></OurProgram>
      <WhatWeDo></WhatWeDo>
      <ButtomtoTop></ButtomtoTop>
    </div>
  );
};

export default Home;
