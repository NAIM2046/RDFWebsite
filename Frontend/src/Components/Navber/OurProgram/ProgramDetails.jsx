import React from "react";
import { useLocation } from "react-router-dom";

const ProgramDetails = () => {
  const location = useLocation();
  const program = location.state?.program;

  if (!program) {
    return <p className="text-center text-red-500">Program not found!</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10 lg:py-16">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
        {/* Left Side - Text & Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-blue-600">{program.title}</h1>
          <p className="text-gray-700">{program.description}</p>

          {/* Key Focus Areas */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Key Focus Areas
            </h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
              <li>Economic Empowerment</li>
              <li>Gender Equity</li>
              <li>Climate Change Adaptation</li>
            </ul>
          </div>

          {/* Projects List */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Projects Under This Program
            </h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
              {program.projects.map((project, index) => (
                <li key={index} className="border-b pb-1">
                  {project}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side - Images & Infographics */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center lg:items-end gap-6 mt-16">
          {/* Image Section */}
          <div className="relative flex flex-col sm:flex-row items-center gap-4">
            <div className="w-72 h-56 sm:w-80 sm:h-64">
              <img
                src={program.image}
                alt="Program Image 1"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="w-60 h-48 sm:w-72 sm:h-56 -mt-6 sm:-mt-0 sm:-ml-6">
              <img
                src="/assets/images-2-1.png"
                alt="Program Image 2"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Video Embed */}
          <div className="w-full sm:w-96 h-48">
            <iframe
              className="w-full h-full rounded-lg shadow-md"
              src="https://www.youtube.com/embed/vrgfD6OjAJE"
              title="Program Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;
