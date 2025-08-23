import React from "react";

const PageCoverPhoto = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="relative w-full h-[450px] md:h-[500px] lg:h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Blur Effect */}
      <img
        src={imageUrl || `/assets/RDF Photo/3.jpg`} // Use fallback if imageUrl is undefined
        alt="Cover"
        className="absolute w-full h-full object-cover"
        // Replace broken images
      />

      {/* Dark Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-opacity-40"></div>

      {/* Content */}
      <div className="relative text-center text-white px-6 md:px-12 lg:px-16 max-w-3xl">
        <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold rounded-3xl bg-black/10 p-2">
          {title}
        </h1>
        <p className="mt-3 text-lg md:text-xl lg:text-2xl font-light drop-shadow-md bg-black/10">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default PageCoverPhoto;
