import React, { useEffect } from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import OurApproach from "./OurApproach";
import WeWorkFor from "./WeWorkFor";
import { useLocation } from "react-router-dom";

import WhereWeWork from "./WhereWeWork";
import { Helmet } from "react-helmet-async";

const OurWork = () => {
  const location = useLocation();
  console.log(location.hash);

  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({ block: "start" });
      }
    }
  }, [location]);
  return (
    <div>
      <Helmet>
        <title> RDF-Our Works </title>
      </Helmet>
      <PageCoverPhoto title={"Our Approach "}></PageCoverPhoto>
      <div>
        <section id="ourapproach">
          <OurApproach></OurApproach>
        </section>

        <section id="weworkfor">
          <WeWorkFor></WeWorkFor>
        </section>
        <section id="wherewework">
          <WhereWeWork></WhereWeWork>
        </section>
      </div>
    </div>
  );
};

export default OurWork;
