import React from "react";
import { Outlet } from "react-router-dom";
import Navber from "../../Components/Navber/Navber";
import Footer from "../../Components/Navber/Footer/Footer";

const Main = () => {
  return (
    <div>
      <Navber></Navber>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
