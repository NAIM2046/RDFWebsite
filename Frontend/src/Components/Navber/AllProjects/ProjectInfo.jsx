import React, { useState } from "react";

const ProjectInfo = () => {
  const projectData = {
    title: "Educational Support Program",
    duration: "Jan 2024 - Dec 2025",
    location: "Dhaka, Bangladesh",
    donor: "XYZ Foundation",
    budget: "$500,000",
    details:
      "This project aims to provide educational resources for underprivileged children in Dhaka, ensuring that they have the necessary tools to succeed in their education. Through book donations, scholarships, and mentorship programs, we strive to bridge the educational gap.",
    objectives: [
      "Increase access to quality education",
      "Provide scholarships for students",
      "Offer mentorship and guidance programs",
      "Enhance digital learning resources",
    ],
    targetPopulation: "Underprivileged children in Dhaka",
    achievements: [
      "Distributed 10,000 books",
      "Provided 500 scholarships",
      "Established 20 digital learning centers",
    ],
    image: [
      "/assets/photo-119-400x284.jpg",
      "/assets/photo-119-400x284.jpg",
      "/assets/photo-119-400x284.jpg",
    ],
    videoId: "xAz2pJdssIU",
    news: "Read about the latest developments in this project...",
  };
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-10">
      {/* Header Section */}
      <div className="bg-gradient-to-r  bg-white  text-black p-6 rounded-lg text-center shadow-sm">
        <h1 className="text-4xl font-bold">{projectData.title}</h1>
        <p className="text-lg mt-2">{projectData.duration}</p>
        <p className="mt-1 text-sm">
          📍 {projectData.location} | 💰 Budget: {projectData.budget}
        </p>
        <p className="text-sm mt-1">🤝 Donor: {projectData.donor}</p>
      </div>

      {/* Project Overview */}
      <div className="mt-8 bg-white p-6 rounded-lg ">
        <h2 className="text-2xl font-semibold text-gray-800">
          🌟 Project Overview
        </h2>
        <p className="mt-3 text-gray-700">{projectData.details}</p>
      </div>

      {/* Objectives & Target Audience */}
      <div className="mt-8 flex flex-col md:flex-row gap-8">
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md w-full md:w-1/2">
          <h3 className="text-xl font-semibold text-gray-800">🎯 Objectives</h3>
          <ul className="mt-3 list-disc pl-5 text-gray-700">
            {projectData.objectives.map((obj, index) => (
              <li key={index}>{obj}</li>
            ))}
          </ul>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md w-full md:w-1/2">
          <h3 className="text-xl font-semibold text-gray-800">
            👥 Target Population
          </h3>
          <p className="mt-3 text-gray-700">{projectData.targetPopulation}</p>
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-8 bg-blue-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">
          🏆 Achievements
        </h2>
        <ul className="mt-3 list-disc pl-5 text-gray-700">
          {projectData.achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </div>

      {/* Gallery & Video Section */}
      <div className="mt-8 flex flex-col md:flex-row gap-8">
        {/* Image Gallery */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            📸 Project Gallery
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {projectData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Project Image ${index}`}
                onClick={() => setSelectedImage(img)}
                className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>
        {selectedImage && (
          <div
            className="fixed top-0 left-0 w-full h-full  bg-opacity-80 flex justify-center items-center z-50"
            onClick={() => setSelectedImage(null)} // Close on background click
          >
            <div className="relative">
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 bg-white text-black p-2 rounded-full shadow-md hover:bg-red-200 hover:text-white transition"
                onClick={() => setSelectedImage(null)}
              >
                ❌
              </button>
              {/* Fullscreen Image */}
              <img
                src={selectedImage}
                alt="Selected"
                className=" rounded-lg shadow-lg"
              />
            </div>
          </div>
        )}
        {/* Video Section */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            🎥 Project Video
          </h3>
          <div className="relative">
            <iframe
              className="w-full h-56 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              src={`https://www.youtube.com/embed/${projectData.videoId}`}
              title="Project Video"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="mt-8 text-center">
        <a
          href="#"
          className="text-lg text-purple-600 font-semibold hover:underline"
        >
          📰 {projectData.news}
        </a>
      </div>
    </div>
  );
};

export default ProjectInfo;
