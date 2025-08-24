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
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <Navber />

      {/* Main content (always keeps space) */}
      <main className="flex-1 min-h-[80vh]">
        <Outlet />
      </main>

      {/* Footer always bottom */}
      <Footer />

      {/* Back to Top Button */}
      <ButtomtoTop />
    </div>
  );
};

export default Main;
