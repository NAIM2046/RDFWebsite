import React from "react";
import JoinUs from "../../Components/Navber/JoinUs/JoinUs";
import { Helmet } from "react-helmet-async";

const Intership = () => {
  return (
    <div className="mb-11 mx-auto max-w-6xl p-10 shadow-2xl">
      <Helmet>
        <title> RDF-Intership </title>
      </Helmet>
      <JoinUs header={"Join Us as a Internship"}></JoinUs>
    </div>
  );
};

export default Intership;
