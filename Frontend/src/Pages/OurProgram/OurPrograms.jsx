import React from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import OurProgram from "../../Components/Navber/OurProgram/OurProgram";
import BlogSection from "../../Components/Navber/BlogeSection/BlogeSection";

const OurPrograms = () => {
  return (
    <div>
      <PageCoverPhoto title={"OUR PROGRAM"}></PageCoverPhoto>
      <OurProgram></OurProgram>
      <BlogSection></BlogSection>
    </div>
  );
};

export default OurPrograms;
