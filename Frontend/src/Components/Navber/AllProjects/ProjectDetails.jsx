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
    <div className="max-w-7xl mx-auto p-2">
      <Helmet>
        <title> RDF-Project Details </title>
      </Helmet>
      {/* Project Header */}
      <div className="p-6 bg-gray-50 text-gray-800 mt-10 lg:mt-0">
        {/* Header Section */}
        <div className="text-center mt-20 md:mt-5">
          <h1 className="text-4xl font-extrabold font-serif bg-gradient-to-r from-indigo-500 via-green-400 to-red-400 text-transparent bg-clip-text drop-shadow-md tracking-wide">
            {project.name}
          </h1>
        </div>

        {/* Project Media Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Handle case when only one image exists */}
          {project.images && (
            <div className="col-span-1 md:col-span-3 flex justify-center">
              <img
                src={project.images[0]}
                alt="Project Cover"
                className="rounded-lg shadow-lg w-full h-[300px] md:h-[500px] object-cover"
              />
            </div>
          )}
        </div>

        {/* Project Details Section */}
        <div className="mt-6 p-4 md:p-6 mx-auto max-w-7xl bg-white shadow-md rounded-lg flex flex-col md:flex-row gap-6">
          {/* Left Section */}
          <div className="w-full md:w-2/3">
            {/* Project Goal */}
            <p className="text-lg text-gray-800 ">
              <h1 className="text-xl font-semibold text-gray-900 border-l-5 border-green-500 pl-1">
                <strong> Project Goal:</strong>
              </h1>
              <p className="pl-4">{project.projectGoal}</p>
            </p>

            {/* Project Summary */}
            <p className="text-lg text-gray-800  mt-4">
              <h1 className="text-xl font-semibold text-gray-900 border-l-5 border-green-500 pl-2">
                {" "}
                <strong>Project Summary:</strong>
              </h1>
              <p className="pl-4"> {project.projectSummary || "N/A"}</p>
            </p>

            {/* Major Interventions */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-bold text-gray-900 border-l-4 border-green-500 pl-4">
                Major Interventions
              </h2>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1 pl-4">
                {project.majorInterventions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Project Results */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-bold text-gray-900 border-l-4 border-green-500 pl-4">
                Project Results
              </h2>
              <p className="text-gray-700 mt-2 pl-4">
                {project.projectResults || "No results available yet."}
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/3 border-2 border-blue-600 bg-gray-100 rounded-xl">
            <h1 className="text-center border-b-2 p-3 text-green-600 text-xl font-bold bg-white rounded-t-xl font-serif">
              Project Information
            </h1>

            <div className="p-4 space-y-2 text-blue-900 text-sm md:text-base">
              <p>
                <strong>Donor:</strong> {project.donor}
              </p>
              <p>
                <strong>Budget:</strong> {project.budget}
              </p>
              <p>
                <strong>Duration:</strong> {project.startDate} to{" "}
                {project.endDate}
              </p>
              <p>
                <strong>Project State:</strong> {project.projectState}
              </p>
              <p>
                <strong>Implementing Areas:</strong>{" "}
                {project.implementingAreas.join(", ")}
              </p>

              <p>
                <strong>Direct Beneficiaries:</strong>
                Male: {project.directBeneficiaries.male}, Female:{" "}
                {project.directBeneficiaries.female}
              </p>

              <p>
                <strong>Indirect Beneficiaries:</strong>
                Male: {project.indirectBeneficiaries.male}, Female:{" "}
                {project.indirectBeneficiaries.female}
              </p>

              {project.projectCompletionReport && (
                <p>
                  <strong>Completion Report:</strong>
                  <a
                    href={project.projectCompletionReport}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline ml-1"
                  >
                    View Report
                  </a>
                </p>
              )}
            </div>

            {/* Project Image Gallery */}
            {project.images?.length > 0 && (
              <div className="p-4">
                <h2 className="text-center text-lg font-semibold text-green-500 mb-2 border-2 rounded-md bg-white">
                  Project Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Project Image ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg border border-gray-300 shadow-sm"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Project Video */}
            {project.video && (
              <div className=" p-4">
                <h2 className="text-center text-lg font-semibold text-green-500 mb-2">
                  Project Video
                </h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="w-full h-32 rounded-lg border border-gray-300 shadow-sm"
                    src={`https://www.youtube.com/embed/${project.video}`}
                    title="Project Video"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
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
