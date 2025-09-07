import React from "react";
import JoinUs from "../../Components/Navber/JoinUs/JoinUs";
import { Helmet } from "react-helmet-async";
import photo from "/assets/joinus/joinus1.svg";
const Voluntear = () => {
  return (
    <div className=" mb-11 mx-auto max-w-6xl p-10 shadow-2xl ">
      <Helmet>
        <title> RDF-Volunteer </title>
      </Helmet>
      <JoinUs header={"Join Us Volunteer"} photo={photo}></JoinUs>
    </div>
  );
};

export default Voluntear;
