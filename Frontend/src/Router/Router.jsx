import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import VisionMission from "../Pages/vision_Mission/VisionMission";
import OurTeam from "../Pages/OurTeam/OurTeam";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/vision-mission",
        element: <VisionMission></VisionMission>,
      },
      {
        path: "/our-team",
        element: <OurTeam></OurTeam>,
      },
    ],
  },
]);
export default router;
