import React from "react";
import { Outlet } from "react-router-dom";
import Navber from "../../Components/Navber/Navber";
import Footer from "../../Components/Navber/Footer/Footer";
import ButtomtoTop from "../../Components/Navber/ButtomtoTop/ButtomtoTop";

const Main = () => {
  return (
    <div>
      <Navber></Navber>
      <Outlet></Outlet>
      <Footer></Footer>
      <ButtomtoTop></ButtomtoTop>
    </div>
  );
};

export default Main;
