import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RelateNews from "./RelateNews";
import ShareAndComment from "./ShareAndComment";
import useRDFStore from "../../../storage/useRDFstorage";

import { IoIosArrowForward } from "react-icons/io";
import { FaUserAlt, FaCalendarAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const ProjectDetails = () => {
  const location = useLocation();

  // Retrieve from location or fallback to stored project
  const storedProject = localStorage.getItem("selectedProject");
  const project =
    location.state?.project ||
    (storedProject ? JSON.parse(storedProject) : null);

  console.log(project);

  // Save project to localStorage if it exists
  useEffect(() => {
    if (project) {
      localStorage.setItem("selectedProject", JSON.stringify(project));
    }
  }, [project]);

  if (!project)
    return <p className="text-center text-red-500">Project not found!</p>;

  // Handle video embedding
  const videoUrl = project.video.includes("http")
    ? project.video
    : `https://www.youtube.com/embed/${project.video}`;

  const { newss, fetchNews } = useRDFStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!newss.length) {
      fetchNews();
    }
  }, []);

  console.log("news", newss);

  const filterNews = newss.filter(
    (news) => String(news.program) === String(project.programName)
  );

  console.log("filternews", filterNews);

  const truncateDescription = (text, wordLimit = 30) => {
    return text.split(" ").slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Helmet>
        <title> RDF-Project </title>
      </Helmet>
      {/* Project Header */}
      <div className="p-6 bg-gray-50 text-gray-800">
        {/* Header Section */}
        <div className="text-center mt-20 md:mt-5">
          <h1 className="text-3xl font-bold text-gray-900 font-serif">
            {project.name}
          </h1>
          <p className="text-gray-700 mt-2">
            <strong>Donor:</strong> {project.donor} | <strong>Budget:</strong>{" "}
            {project.budget}
          </p>
          <p className="text-gray-700">
            <strong>Duration:</strong> {project.startDate} - {project.endDate}
          </p>
        </div>

        {/* Project Media Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cover Image (2/3 width on larger screens) */}
          <div className="md:col-span-2 flex justify-center">
            <img
              src={project.images[0]}
              alt="Project Cover"
              className="rounded-lg shadow-lg w-full h-[300px] md:h-[450px] object-cover"
            />
          </div>

          {/* Additional Images & Video (1/3 width) */}
          <div className="flex flex-col space-y-4">
            {/* Additional Images */}
            <div className="grid grid-cols-1 gap-3">
              {project.images.slice(1).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Project ${index + 1}`}
                  className="rounded-lg shadow-md w-full h-[120px] md:h-[180px] object-cover"
                />
              ))}
            </div>

            {/* Video Section */}
            <div className="relative w-full h-48 md:h-64">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                src={`https://www.youtube.com/embed/${project.video}`}
                title="Project Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Project Details Section */}
        <div className="mt-6 p-4 md:p-6 mx-auto max-w-6xl bg-white shadow-md rounded-lg">
          {/* Project Goal */}
          <p className="text-lg text-gray-800 font-semibold border-l-2 border-green-500 pl-3">
            <strong>Project Goal:</strong> {project.projectGoal}
          </p>

          {/* Grid Layout */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Side Details */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-green-700 border-b pb-2">
                Project Details
              </h3>

              <p className="text-gray-700">
                <strong>State:</strong> {project.projectState}
              </p>
              <p className="text-gray-700">
                <strong>Areas:</strong> {project.implementingAreas}
              </p>
              <p className="text-gray-700">
                <strong>Completion Report:</strong>{" "}
                <span className="text-blue-500">
                  {project.projectCompletionReport || "N/A"}
                </span>
              </p>
              <p className="text-gray-700">
                <strong>Remarks:</strong>{" "}
                <span className="italic text-gray-500">
                  {project.remarks || "N/A"}
                </span>
              </p>
            </div>

            {/* Beneficiaries */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-green-700 border-b pb-2">
                Beneficiaries
              </h3>
              <p className="text-gray-700 mt-2">
                <strong>Direct Beneficiaries:</strong>{" "}
                <span className="text-blue-600">
                  Male: {project.directBeneficiaries.male}
                </span>
                ,
                <span className="text-pink-600">
                  {" "}
                  Female: {project.directBeneficiaries.female}
                </span>
              </p>
              <p className="text-gray-700">
                <strong>Indirect Beneficiaries:</strong>{" "}
                <span className="text-blue-600">
                  Male: {project.indirectBeneficiaries.male}
                </span>
                ,
                <span className="text-pink-600">
                  {" "}
                  Female: {project.indirectBeneficiaries.female}
                </span>
              </p>
            </div>
          </div>

          {/* Major Interventions */}
          <div className="mt-8 p-4 bg-white">
            <h2 className="text-xl font-semibold text-gray-900 border-l-2 border-green-500 pl-3">
              Major Interventions
            </h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              {project.majorInterventions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Project Results */}
          <div className="mt-6 p-4 bg-white">
            <h2 className="text-xl font-semibold text-gray-900 border-l-2 border-gray-400 pl-3">
              Project Results
            </h2>
            <p className="text-gray-700 mt-2">
              {project.projectResults || "No results available yet."}
            </p>
          </div>
        </div>
      </div>

      <section className="py-16  bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-12">
            Relate News
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filterNews.map((news) => (
              <div
                key={news._id}
                className="group border border-gray-300 rounded-3xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={news.imageURL}
                  alt={`Blog image ${news._id}`}
                  className="w-full h-64 object-cover rounded-t-3xl"
                />
                <div className="p-6 bg-white group-hover:bg-indigo-50 transition-all duration-300">
                  <div className="flex justify-between items-center mb-4">
                    {/* Author Section */}
                    <div className="flex items-center space-x-2">
                      <FaUserAlt className="text-indigo-600 text-xl" />
                      <span className="text-indigo-600 font-semibold">
                        {news.author}
                      </span>
                    </div>
                    {/* Date Section */}
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt className="text-indigo-600 text-xl" />
                      <span className="text-gray-500 text-sm">{news.date}</span>
                    </div>
                  </div>
                  <h4 className="text-xl text-gray-900 font-semibold mt-2 mb-4">
                    {news.title}
                  </h4>
                  <p className="text-gray-600 text-base mb-6">
                    {truncateDescription(news.content[0].description)}
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/news/${news._id}`, { state: { news } })
                    }
                    className="flex items-center space-x-2 text-indigo-600 font-semibold border border-indigo-600 px-4 py-2 rounded-lg transition-all hover:bg-indigo-600 hover:text-white cursor-pointer"
                  >
                    Read Details
                    <IoIosArrowForward className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* View All Button */}
          <div className="text-center mt-12">
            <a
              href="/news"
              className="text-lg text-indigo-600 font-semibold hover:underline"
            >
              View All News
            </a>
          </div>
        </div>
      </section>
      <ShareAndComment />
    </div>
  );
};

export default ProjectDetails;
