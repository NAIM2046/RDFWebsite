import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import VisionMission from "../Pages/vision_Mission/VisionMission";
import OurTeam from "../Pages/OurTeam/OurTeam";
import MemberDetail from "../Pages/OurTeam/MemberDetail";
import AnnualReport from "../Pages/AnnualReport/AnnualReport";
import ProgramDetails from "../Components/Navber/OurProgram/ProgramDetails";
import AllProjects from "../Components/Navber/AllProjects/AllProjects";
import ProjectDetails from "../Components/Navber/AllProjects/ProjectDetails";
import RecentNews from "../Pages/RecentNews/RecentNews";
import NewsDetails from "../Pages/RecentNews/NewsDetails";
import OurWork from "../Pages/OurWork/WeWorkFor";
import WeWorkFor from "../Pages/OurWork/WeWorkFor";
import OurApproach from "../Pages/OurWork/OurApproach";
import KeyFocusArea from "../Pages/OurWork/KeyFocusArea";
import Photo from "../Pages/Photo/Photo";
import Videos from "../Pages/Video/Videos";
import FounderMessage from "../Pages/FounderMessage/FounderMessage";
import PolicyDoc from "../Pages/PolicyDoc/PolicyDoc";
import OurPartners from "../Pages/Ourpartners/Ourpartners";
import Organogram from "../Pages/Organogram/Organogram";
import Certifications from "../Pages/Certification/Certification";
import ContactUs from "../Pages/ContactUs/ContactUs";
import ProjectPartner from "../Pages/ProjectPartner/ProjectPartner";
import Intership from "../Pages/Internship/Intership";
import Voluntear from "../Pages/Voluntear/Voluntear";
import ActivitiesDetail from "../Components/Navber/OurActivities/ActivitiesDetail";
import EventsPage from "../Pages/Events/EventsPage";
import EventDetail from "../Pages/Events/EventDetail";

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
      {
        path: "/program-details",
        element: <ProgramDetails></ProgramDetails>,
      },
      {
        path: "/all-projects",
        element: <AllProjects></AllProjects>,
      },
      {
        path: "/project-details",
        element: <ProjectDetails></ProjectDetails>,
      },
      {
        path: "/recent-news",
        element: <RecentNews></RecentNews>,
      },
      {
        path: "/recent-news/details",
        element: <NewsDetails></NewsDetails>,
      },
      {
        path: "/we-work-for",
        element: <WeWorkFor></WeWorkFor>,
      },
      {
        path: "/our-approach",
        element: <OurApproach></OurApproach>,
      },
      {
        path: "/key-focus-area",
        element: <KeyFocusArea></KeyFocusArea>,
      },
      {
        path: "/photos",
        element: <Photo></Photo>,
      },
      {
        path: "/videos",
        element: <Videos></Videos>,
      },
      {
        path: "/founder-messages",
        element: <FounderMessage></FounderMessage>,
      },
      {
        path: "/policy-document",
        element: <PolicyDoc></PolicyDoc>,
      },
      {
        path: "/our-partners",
        element: <OurPartners></OurPartners>,
      },
      {
        path: "/organogram",
        element: <Organogram></Organogram>,
      },
      {
        path: "/certification",
        element: <Certifications></Certifications>,
      },
      {
        path: "/contact",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/project-partner",
        element: <ProjectPartner></ProjectPartner>,
      },
      {
        path: "/internship",
        element: <Intership></Intership>,
      },
      {
        path: "/volunteer",
        element: <Voluntear></Voluntear>,
      },
      {
        path: "/activities-details",
        element: <ActivitiesDetail></ActivitiesDetail>,
      },
      {
        path: "/events",
        element: <EventsPage></EventsPage>,
      },
      {
        path: "/event-details",
        element: <EventDetail></EventDetail>,
      },
    ],
  },
]);
export default router;
