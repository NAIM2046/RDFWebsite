import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import VisionMission from "../Pages/vision_Mission/VisionMission";
import OurTeam from "../Pages/OurTeam/OurTeam";
import MemberDetail from "../Pages/OurTeam/MemberDetail";
import AnnualReport from "../Pages/AnnualReport/AnnualReport";

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
      {
        path: "/our-team/details",
        element: <MemberDetail></MemberDetail>,
      },
      {
        path: "/annual-reports",
        element: <AnnualReport></AnnualReport>,
      },
    ],
  },
]);
export default router;
