import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <h1 className="bg-blue-500">main page </h1>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
