import React from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import img from "/assets/vissionAndMission.webp";
const VisionMission = () => {
  return (
    <div>
      <PageCoverPhoto
        title="Our Mission"
        subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
        imageUrl={img}
      ></PageCoverPhoto>
      <div></div>
    </div>
  );
};

export default VisionMission;
