import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RelateNews from "./RelateNews";
import ShareAndComment from "./ShareAndComment";
import { Helmet } from "react-helmet-async";
import { FiExternalLink } from "react-icons/fi";
import { FaMoneyBillWave, FaClock, FaMapMarkerAlt, FaUsers, FaUserAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Helper to ensure a field is an array of strings
const getAsArray = (field) => {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  if (typeof field === "string") {
    return field
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [String(field)];
};

const ProjectDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [projectItem, setProjectItem] = useState(location.state?.project || null);
  const [isProjectLoading, setIsProjectLoading] = useState(!projectItem);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProjectDetail = async () => {
      if (location.state?.project) return;
      setIsProjectLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/projects/${id}`);
        setProjectItem(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setIsProjectLoading(false);
      }
    };
    fetchProjectDetail();
  }, [id]);

  useEffect(() => {
    if (!projectItem?.programName) return;
    const fetchRelatedNews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/news?program=${projectItem.programName}`);
        setRelatedNews(response.data);
      } catch (error) {
        console.error("Error fetching related news:", error);
      }
    };
    fetchRelatedNews();
  }, [projectItem]);

  const project = projectItem;
  const filterNews = relatedNews;
  const sortedImages = project ? [...getAsArray(project.images)].reverse() : [];

  const [isOpenSlider, setIsOpenSlider] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Keyboard navigation and escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpenSlider) return;
      if (e.key === "Escape") {
        setIsOpenSlider(false);
      } else if (e.key === "ArrowLeft") {
        setActiveImageIndex(
          (prev) => (prev - 1 + sortedImages.length) % sortedImages.length
        );
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev + 1) % sortedImages.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpenSlider, sortedImages.length]);

  // Save project to localStorage if it exists
  useEffect(() => {
    if (project) {
      localStorage.setItem("selectedProject", JSON.stringify(project));
    }
  }, [project]);

  if (isProjectLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-center text-red-500 text-xl font-medium bg-white p-6 rounded-lg shadow-md">
          Project not found!
        </p>
      </div>
    );

  // Handle video embedding
  const videoUrl = project.video?.includes("http")
    ? project.video
    : project.video
      ? `https://www.youtube.com/embed/${project.video}`
      : null;


  const truncateDescription = (text, wordLimit = 30) => {
    if (!text) return "";
    return text.split(" ").slice(0, wordLimit).join(" ") + "...";
  };

  // Helper function to check if field has content
  const hasContent = (field) => {
    if (field === null || field === undefined) return false;
    if (typeof field === "string") return field.trim() !== "";
    if (Array.isArray(field)) return field.length > 0;
    if (typeof field === "object") return Object.keys(field).length > 0;
    return true;
  };



  return (
    <div className="max-w-7xl mx-auto p-4">
      <Helmet>
        <title>{project.name} | RDF Project Details</title>
        <meta
          name="description"
          content={project.projectGoal || "RDF Project Details"}
        />
      </Helmet>

      {/* Project Header */}
      <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-sm mt-10 lg:mt-0">
        {/* Header Section */}
        <div className="text-center mt-10 md:mt-5">
          <h1 className="text-4xl font-extrabold font-serif text-green-700">
            {project.name}
          </h1>
          <div className="w-24 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Project Media Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {getAsArray(project.images).length > 0 && getAsArray(project.images)[0] && (
            <div
              className="col-span-1 md:col-span-3 flex justify-center cursor-pointer overflow-hidden rounded-xl"
              onClick={() => {
                const coverIdx = sortedImages.indexOf(getAsArray(project.images)[0]);
                setActiveImageIndex(coverIdx !== -1 ? coverIdx : 0);
                setIsOpenSlider(true);
              }}
            >
              <img
                src={getAsArray(project.images)[0]}
                alt="Project Cover"
                className="rounded-xl w-full h-[300px] md:h-[500px] object-cover shadow-lg hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Project Details Section */}
      <div className="mt-8 p-4 md:p-6 mx-auto bg-white shadow-md rounded-xl flex flex-col md:flex-row gap-8">
        {/* Left Section */}
        <div className="w-full md:w-2/3">
          {/* Project Goal */}
          {hasContent(project.projectGoal) && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-2 h-8 bg-green-600 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Project Goal
                </h2>
              </div>
              <p className="text-gray-600 pl-5 leading-relaxed">
                {project.projectGoal}
              </p>
            </div>
          )}

          {/* Project Summary */}
          {hasContent(project.projectSummary) && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-2 h-8 bg-green-600 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Project Summary
                </h2>
              </div>
              <p className="text-gray-600 pl-5 leading-relaxed">
                {project.projectSummary}
              </p>
            </div>
          )}

          {/* Major Interventions */}
          {getAsArray(project.majorInterventions).length > 0 && (
            <div className="mt-8 p-6 bg-green-50 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-2 h-8 bg-green-600 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Major Interventions
                </h2>
              </div>
              <ul className="space-y-3 pl-5">
                {getAsArray(project.majorInterventions).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Project Results */}
          {hasContent(project.projectResults) && (
            <div className="mt-8 p-6 bg-green-50 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-2 h-8 bg-green-600 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Project Results
                </h2>
              </div>
              <p className="text-gray-700 pl-5 leading-relaxed">
                {project.projectResults}
              </p>
            </div>
          )}
        </div>

        {/* Right Section - Only show if there's content */}
        {(hasContent(project.donor) ||
          hasContent(project.budget) ||
          hasContent(project.startDate) ||
          hasContent(project.projectState) ||
          hasContent(project.implementingAreas) ||
          hasContent(project.directBeneficiaries) ||
          hasContent(project.indirectBeneficiaries) ||
          hasContent(project.projectCompletionReport) ||
          hasContent(project.images) ||
          hasContent(project.video)) && (
          <div className="w-full md:w-1/3 border border-green-200 bg-white rounded-xl shadow-sm">
            <div className="bg-green-700 px-6 py-4 rounded-t-xl">
              <h1 className="text-center text-white text-xl font-bold font-serif">
                Project Information
              </h1>
            </div>

            <div className="p-6 space-y-4">
              {/* Donor */}
              {hasContent(project.donor) && (
                <div className="flex items-start">
                  <FaMoneyBillWave className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Donor</p>
                    <p className="text-gray-800">{project.donor}</p>
                  </div>
                </div>
              )}

              {/* Budget */}
              {hasContent(project.budget) && (
                <div className="flex items-start">
                  <FaMoneyBillWave className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Budget</p>
                    <p className="text-gray-800">{project.budget}</p>
                  </div>
                </div>
              )}

              {/* Duration */}
              {hasContent(project.startDate) && hasContent(project.endDate) && (
                <div className="flex items-start">
                  <FaClock className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Duration
                    </p>
                    <p className="text-gray-800">
                      {project.startDate} to {project.endDate}
                    </p>
                  </div>
                </div>
              )}

              {/* Project State */}
              {hasContent(project.projectState) && (
                <div className="flex items-start">
                  <div className="mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        project.projectState === "Ongoing"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    ></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Project State
                    </p>
                    <p className="text-gray-800">{project.projectState}</p>
                  </div>
                </div>
              )}

              {/* Implementing Areas */}
              {getAsArray(project.implementingAreas).length > 0 && (
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Implementing Areas
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {getAsArray(project.implementingAreas).map((area, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Direct Beneficiaries */}
              {hasContent(project.directBeneficiaries) &&
                (project.directBeneficiaries.male > 0 ||
                  project.directBeneficiaries.female > 0) && (
                  <div className="flex items-start">
                    <FaUsers className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Direct Beneficiaries
                      </p>
                      <div className="flex gap-4 mt-1">
                        <div>
                          <span className="text-xs text-gray-500">Male</span>
                          <p className="text-gray-800">
                            {project.directBeneficiaries.male || 0}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Female</span>
                          <p className="text-gray-800">
                            {project.directBeneficiaries.female || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              {/* Indirect Beneficiaries */}
              {hasContent(project.indirectBeneficiaries) &&
                (project.indirectBeneficiaries.male > 0 ||
                  project.indirectBeneficiaries.female > 0) && (
                  <div className="flex items-start">
                    <FaUsers className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Indirect Beneficiaries
                      </p>
                      <div className="flex gap-4 mt-1">
                        <div>
                          <span className="text-xs text-gray-500">Male</span>
                          <p className="text-gray-800">
                            {project.indirectBeneficiaries.male || 0}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Female</span>
                          <p className="text-gray-800">
                            {project.indirectBeneficiaries.female || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              {/* Project Completion Report */}
              {hasContent(project.projectCompletionReport) && (
                <div className="pt-4 border-t border-gray-200">
                  <a
                    href={project.projectCompletionReport}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-sm"
                  >
                    View Completion Report
                    <FiExternalLink className="ml-2" />
                  </a>
                </div>
              )}
            </div>

            {/* Project Image Gallery */}
            {sortedImages.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <h2 className="text-center text-lg font-semibold text-green-700 mb-4">
                  Project Gallery
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {sortedImages.slice(0, 4).map((img, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer overflow-hidden rounded-lg"
                      onClick={() => {
                        setActiveImageIndex(index);
                        setIsOpenSlider(true);
                      }}
                    >
                      <img
                        src={img}
                        alt={`Project Image ${index + 1}`}
                        className="w-full h-28 object-cover rounded-lg border border-gray-200 shadow-sm group-hover:scale-105 transition-transform duration-300"
                      />
                      {index === 3 && sortedImages.length > 4 && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                          <span className="text-white font-medium">
                            +{sortedImages.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Video */}
            {hasContent(project.video) && (
              <div className="p-4 border-t border-gray-200">
                <h2 className="text-center text-lg font-semibold text-green-700 mb-4">
                  Project Video
                </h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="w-full h-48 rounded-lg shadow-sm"
                    src={videoUrl}
                    title="Project Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Relevant News Section - Only show if there are Relevant News */}
      {hasContent(filterNews) && (
        <section className="py-12 bg-gray-50 mt-12 rounded-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Relevant News
              </h2>
              <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filterNews.map((news) => (
                <div
                  key={news._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={news.imageURL}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <span className="text-xs text-white bg-green-600 px-2 py-1 rounded-full">
                        {news.date}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FaUserAlt className="mr-2 text-green-600" />
                      <span>{news.author}</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {news.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {truncateDescription(news.content[0]?.description)}
                    </p>
                    <button
                      onClick={() =>
                        navigate(`/news/${news._id}`, { state: { news } })
                      }
                      className="flex items-center text-green-600 hover:text-green-800 font-medium text-sm"
                    >
                      Read Details
                      <IoIosArrowForward className="ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {filterNews.length > 0 && (
              <div className="text-center mt-10">
                <button
                  onClick={() => navigate("/news")}
                  className="inline-flex items-center px-5 py-2.5 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  View All News
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      <ShareAndComment />

      {/* Full-Page Image Slider Modal */}
      <AnimatePresence>
        {isOpenSlider && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={() => setIsOpenSlider(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpenSlider(false)}
              className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-50 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Prev Button */}
            {sortedImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(
                    (prev) => (prev - 1 + sortedImages.length) % sortedImages.length
                  );
                }}
                className="absolute left-4 md:left-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-50 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Active Image */}
            <motion.div
              key={activeImageIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[80vh] px-4 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={sortedImages[activeImageIndex]}
                alt={`Slide ${activeImageIndex + 1}`}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Pagination Info */}
              <div className="text-white/60 mt-4 text-sm font-medium">
                Image {activeImageIndex + 1} of {sortedImages.length}
              </div>
            </motion.div>

            {/* Next Button */}
            {sortedImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => (prev + 1) % sortedImages.length);
                }}
                className="absolute right-4 md:right-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-50 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetails;
