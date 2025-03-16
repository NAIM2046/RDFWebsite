import React from "react";
import RecentNews from "../RecentNews/RecentNews";
import { Helmet } from "react-helmet-async";

const Blog = () => {
  return (
    <div>
      <Helmet>
        <title> RDF- Blogs </title>
      </Helmet>
      <RecentNews></RecentNews>
    </div>
  );
};

export default Blog;
