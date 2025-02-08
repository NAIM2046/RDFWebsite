import {
  FaClock,
  FaMapMarkerAlt,
  FaHandHoldingHeart,
  FaDollarSign,
  FaCheckCircle,
  FaBullseye,
  FaUsers,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import RelateNews from "./RelateNews";
import ShareAndComment from "./ShareAndComment";
import ProjectInfo from "./ProjectInfo";

const ProjectDetails = () => {
  return (
    <div className="mx-auto p-6">
      {/* Project Header */}
      <ProjectInfo></ProjectInfo>
      <RelateNews></RelateNews>
      <ShareAndComment></ShareAndComment>
    </div>
  );
};

export default ProjectDetails;
