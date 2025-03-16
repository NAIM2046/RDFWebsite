import React from "react";
import RecentNews from "../RecentNews/RecentNews";
import { Helmet } from "react-helmet-async";

const Publication = () => {
  return (
    <div>
      <Helmet>
        <title> RDF-Publication </title>
      </Helmet>
      <RecentNews></RecentNews>
    </div>
  );
};

export default Publication;
