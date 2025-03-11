import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navber from "../../Components/Navber/Navber";
import Footer from "../../Components/Navber/Footer/Footer";
import ButtomtoTop from "../../Components/Navber/ButtomtoTop/ButtomtoTop";

const Main = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);
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
