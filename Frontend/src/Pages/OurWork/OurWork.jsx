import React, { useEffect } from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import OurApproach from "./OurApproach";

import { Helmet } from "react-helmet-async";

const OurWork = () => {
  return (
    <div>
      <Helmet>
        <title>Our Approach | Resource Development Foundation (RDF)</title>
        <meta
          name="description"
          content="Learn about the unique approach of Resource Development Foundation (RDF) in empowering communities through sustainable development, education, health, and social initiatives."
        />
      </Helmet>

      <PageCoverPhoto
        title={"Our Approach"}
        subtitle={"Creating Sustainable Impact through Transformation"}
      ></PageCoverPhoto>
      <div>
        <section>
          <OurApproach></OurApproach>
        </section>
      </div>
    </div>
  );
};

export default OurWork;
