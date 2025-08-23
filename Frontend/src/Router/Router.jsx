import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

import KeyFocusArea from "../Pages/OurWork/KeyFocusArea";
import Photo from "../Pages/Photo/Photo";
import Videos from "../Pages/Video/Videos";

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

import Blog from "../Pages/Blog/Blog";

import Publication from "../Pages/Publication/Publication";
import CareerWithRDF from "../Pages/CareerWithRDF/CareerWithRDF";
import Notices from "../Pages/Notices/Notices";
import OurWork from "../Pages/OurWork/OurWork";

import OurPrograms from "../Pages/OurProgram/OurPrograms";
import Admin from "../Layout/Admin/Admin";
import Sliderinfo from "../AdminPage/Sliderinfo/Sliderinfo";
import AdminHome from "../AdminPage/AdminHome/AdminHome";
import ProgramPage from "../AdminPage/ProgramPage/ProgramPage";
import ProjectPage from "../AdminPage/ProjectPage/ProjectPage";
import ActiviesPage from "../AdminPage/activiesPage/ActiviesPage";
import TeamsPage from "../AdminPage/TeamsPage/TeamsPage";
import NewsPage from "../AdminPage/NewsPage/NewsPage";
import PhotoPage from "../AdminPage/PhotoPage/PhotoPage";
import VideosPage from "../AdminPage/Videos/VideosPage";

import EventPageadmin from "../AdminPage/EventPage/EventPageadmin";
import PartnerPage from "../AdminPage/PartnerPage/PartnerPage";
import LoginPage from "../AdminPage/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import Adminhandle from "../AdminPage/Adminhandle/Adminhandle";
import CheakOutPage from "../Payment/CheakOutPage";
import PaymentSuccess from "../Payment/PaymentSuccess";
import ReportPage from "../AdminPage/ReportPage/ReportPage";
import AboutRDF from "../Pages/AboutRDF/AboutRDF";
import PolicyDocPage from "../AdminPage/PolicyDocPage/PolicyDocPage";
import CertificationsPage from "../AdminPage/CertificationsPage/CertificationsPage";
import WeWorkFor from "../Pages/OurWork/WeWorkFor";
import WhereWeWork from "../Pages/OurWork/WhereWeWork";

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
        path: "/our-team/:name",
        element: <MemberDetail></MemberDetail>,
      },
      {
        path: "/annual-reports",
        element: <AnnualReport></AnnualReport>,
      },
      {
        path: "/program-details/:id",
        element: <ProgramDetails></ProgramDetails>,
      },
      {
        path: "/all-projects",
        element: <AllProjects></AllProjects>,
      },
      {
        path: "/project-details/:id",
        element: <ProjectDetails></ProjectDetails>,
      },
      {
        path: "/news",
        element: <RecentNews></RecentNews>,
      },
      {
        path: "/news/:id",
        element: <NewsDetails></NewsDetails>,
      },

      {
        path: "/key-focus-area",
        element: <KeyFocusArea></KeyFocusArea>,
      },
      {
        path: "/our-work",
        element: <OurWork></OurWork>,
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
        path: "/event-details/:id",
        element: <EventDetail></EventDetail>,
      },
      {
        path: "/about-rdf",
        element: <AboutRDF></AboutRDF>,
      },

      {
        path: "/blogs",
        element: <Blog></Blog>,
      },

      {
        path: "/publication",
        element: <Publication></Publication>,
      },
      {
        path: "/careers",
        element: <CareerWithRDF></CareerWithRDF>,
      },
      {
        path: "/notice",
        element: <Notices></Notices>,
      },
      {
        path: "/our-program",
        element: <OurPrograms></OurPrograms>,
      },
      {
        path: "/current-projects",
        element: <AllProjects></AllProjects>,
      },
      {
        path: "/weworkfor",
        element: <WeWorkFor></WeWorkFor>,
      },
      {
        path: "/wherewework",
        element: <WhereWeWork></WhereWeWork>,
      },
    ],
  },

  {
    path: "admin-login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/payment",
    element: <CheakOutPage></CheakOutPage>,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess></PaymentSuccess>,
  },
  {
    path: "/admin-rdf",
    element: (
      <PrivateRoute>
        <Admin></Admin>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/admin-rdf",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "/admin-rdf/slider-info",
        element: <Sliderinfo></Sliderinfo>,
      },
      {
        path: "/admin-rdf/program-page",
        element: <ProgramPage></ProgramPage>,
      },
      {
        path: "/admin-rdf/project-page",
        element: <ProjectPage></ProjectPage>,
      },
      {
        path: "/admin-rdf/activities",
        element: <ActiviesPage></ActiviesPage>,
      },
      {
        path: "/admin-rdf/teams",
        element: <TeamsPage></TeamsPage>,
      },
      {
        path: "/admin-rdf/news",
        element: <NewsPage></NewsPage>,
      },
      {
        path: "/admin-rdf/photos",
        element: <PhotoPage></PhotoPage>,
      },
      {
        path: "/admin-rdf/videos",
        element: <VideosPage></VideosPage>,
      },
      {
        path: "/admin-rdf/event",
        element: <EventPageadmin></EventPageadmin>,
      },
      {
        path: "/admin-rdf/partner",
        element: <PartnerPage></PartnerPage>,
      },
      {
        path: "/admin-rdf/admin",
        element: <Adminhandle></Adminhandle>,
      },
      {
        path: "/admin-rdf/report",
        element: <ReportPage></ReportPage>,
      },
      {
        path: "/admin-rdf/policy",
        element: <PolicyDocPage></PolicyDocPage>,
      },
      {
        path: "/admin-rdf/certification",
        element: <CertificationsPage></CertificationsPage>,
      },
    ],
  },
]);
export default router;
