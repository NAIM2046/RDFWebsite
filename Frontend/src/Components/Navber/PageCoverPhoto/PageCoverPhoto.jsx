import React from "react";

const PageCoverPhoto = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="relative w-full h-[450px] md:h-[500px] lg:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={imageUrl}
        alt="Cover"
        className="absolute w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-50"></div>

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
