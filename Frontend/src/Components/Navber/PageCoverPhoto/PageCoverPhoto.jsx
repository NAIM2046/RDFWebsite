import React from "react";
import img from "/assets/vissionAndMission.webp";
const PageCoverPhoto = ({ title, subtitle, imageUrl }) => {
  console.log(imageUrl);

  return (
    <div
      className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-60 md:bg-opacity-50"></div>

      {/* Content */}
      <div className="relative text-center text-white px-6 md:px-12 lg:px-16 max-w-3xl">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg">
          {title}
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl font-light drop-shadow-md">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default PageCoverPhoto;
