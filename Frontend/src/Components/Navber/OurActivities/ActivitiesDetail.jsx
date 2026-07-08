import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaUsers,
  FaClock,
  FaBriefcase,
  FaList,
  FaThLarge,
} from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const ActivitiesDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeActivity, setActiveActivity] = useState(
    location?.state?.activity || null,
  );
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'

  const getImplementingAreasText = (areas) => {
    if (!areas) return "N/A";
    if (Array.isArray(areas)) return areas.join(", ");
    return String(areas);
  };

  const getFirstImplementingArea = (areas) => {
    if (!areas) return "N/A";
    if (Array.isArray(areas)) return areas[0] || "N/A";
    const str = String(areas);
    return str.split(",")[0].trim();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [projectsRes, activitiesRes] = await Promise.all([
          axios.get(`${BASE_URL}/projects`),
          axios.get(`${BASE_URL}/activities`),
        ]);
        setProjects(projectsRes.data);
        setActivities(activitiesRes.data);
      } catch (error) {
        console.error("Error fetching projects and activities:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // If activeActivity is not set yet, default to the first activity once activities are loaded
  useEffect(() => {
    if (!activeActivity && activities.length > 0) {
      setActiveActivity(activities[0]);
    }
  }, [activities, activeActivity]);

  const filteredProjects = projects.filter((project) => {
    if (Array.isArray(project.activitiesID)) {
      return project.activitiesID.includes(activeActivity?._id);
    }
    return project.activitiesID === activeActivity?._id;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-emerald-50 pb-16 pt-24 lg:pt-28">
      {/* Scrollable Activities Navigation */}
      {activities.length > 0 && (
        <div className="relative max-w-7xl mx-auto px-4 mt-8">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3 font-serif">
            Select Other Activities
          </h4>
          <div className="flex space-x-3 overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar py-3 font-serif">
            {activities.map((act) => (
              <motion.div
                key={act._id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2.5 font-medium rounded-lg cursor-pointer text-center min-w-[150px] shadow-sm border transition-all ${
                  activeActivity?._id === act._id
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-transparent"
                    : "bg-white border-emerald-200 text-gray-700 hover:border-emerald-400"
                }`}
                onClick={() => setActiveActivity(act)}
              >
                <span className="block text-sm font-semibold truncate max-w-[180px]">
                  {act.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Active Activity Details Banner */}
      {activeActivity && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100 flex flex-col md:flex-row gap-6 p-6 items-center md:items-start">
            {activeActivity.img && (
              <div className="w-full md:w-1/3 h-48 md:h-64 rounded-xl overflow-hidden shadow-md">
                <img
                  src={activeActivity.img}
                  alt={activeActivity.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                SDG Aligned Activity
              </span>
              <h2 className="text-3xl font-bold font-serif text-emerald-800 mt-2">
                {activeActivity.title}
              </h2>
              <p className="text-gray-600 mt-3 leading-relaxed">
                Browse our projects and interventions operating under the scope
                of this development activity. We are committed to creating
                sustainable, long-term impact.
              </p>

              {/* stats */}
              <div className="flex items-center justify-center md:justify-start gap-4 mt-4 pt-4 border-t border-gray-100">
                <div>
                  <span className="block text-2xl font-bold text-emerald-700 font-serif">
                    {filteredProjects.length}
                  </span>
                  <span className="text-xs text-gray-500 font-medium uppercase">
                    Linked Projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header and Toggle Controls */}
      <div className="max-w-7xl mx-auto px-4 mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-200 pb-4">
        <h3 className="text-2xl font-bold font-serif text-gray-800 text-center sm:text-left">
          Projects and Interventions
        </h3>

        {filteredProjects.length > 0 && (
          <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === "grid"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FaThLarge className="text-xs" />
              <span>Card View</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === "table"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FaList className="text-xs" />
              <span>Table View</span>
            </button>
          </div>
        )}
      </div>

      {/* Projects List Section */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-emerald-600"></div>
            <p className="text-lg ml-3 text-emerald-700">Loading projects...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          viewMode === "grid" ? (
            /* Card View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => {
                const benefitedHHs = project.directBeneficiaries
                  ? (Number(project.directBeneficiaries.male) || 0) +
                    (Number(project.directBeneficiaries.female) || 0)
                  : 0;

                return (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-emerald-50 flex flex-col h-full hover:shadow-xl transition-all"
                  >
                    {/* Image and Status Badge */}
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      {project.images && project.images[0] ? (
                        <img
                          src={project.images[0]}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-600 font-serif font-semibold">
                          RDF Project
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                            project.projectState === "Current"
                              ? "bg-emerald-100 text-emerald-800"
                              : project.projectState === "Hold"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-teal-100 text-teal-800"
                          }`}
                        >
                          {project.projectState === "Current"
                            ? "Ongoing"
                            : project.projectState === "Hold"
                              ? "On Hold"
                              : "Completed"}
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 flex flex-col flex-grow text-left">
                      <h4 className="text-xl font-bold font-serif text-gray-800 mb-2 leading-snug line-clamp-2">
                        {project.name}
                      </h4>

                      {/* Project Summary - Prominently Displayed! */}
                      {project.projectSummary ? (
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {project.projectSummary}
                        </p>
                      ) : (
                        <p className="text-gray-400 text-sm italic mb-4">
                          No summary provided for this project.
                        </p>
                      )}

                      {/* Metadata Grid */}
                      <div className="mt-auto pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-2 text-xs text-gray-600">
                        {/* Donor */}
                        <div className="flex items-center gap-2">
                          <FaBriefcase className="text-emerald-500 flex-shrink-0" />
                          <span
                            className="truncate"
                            title={project.donor || "N/A"}
                          >
                            <strong>Donor:</strong> {project.donor || "N/A"}
                          </span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-emerald-500 flex-shrink-0" />
                          <span
                            className="truncate"
                            title={getImplementingAreasText(
                              project.implementingAreas,
                            )}
                          >
                            <strong>Location:</strong>{" "}
                            {getFirstImplementingArea(
                              project.implementingAreas,
                            )}
                          </span>
                        </div>

                        {/* Budget */}
                        <div className="flex items-center gap-2">
                          <FaMoneyBillWave className="text-emerald-500 flex-shrink-0" />
                          <span>
                            <strong>Value:</strong>{" "}
                            {project.budget
                              ? `৳${Number(project.budget).toLocaleString()}`
                              : "N/A"}
                          </span>
                        </div>

                        {/* Beneficiaries */}
                        <div className="flex items-center gap-2">
                          <FaUsers className="text-emerald-500 flex-shrink-0" />
                          <span>
                            <strong>Benefited:</strong> {benefitedHHs} HHs
                          </span>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          navigate(`/project-details/${project._id}`, {
                            state: { project },
                          })
                        }
                        className="w-full mt-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-md hover:shadow-lg font-semibold text-center text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>View Details</span>
                        <span>→</span>
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Table View */
            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                  <tr>
                    {[
                      "Project Name",
                      "Location",
                      "Donor",
                      "Budget",
                      "Dates",
                      "Beneficiaries",
                      "Status",
                      "Action",
                    ].map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-4 font-semibold tracking-wider uppercase text-xs"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProjects.map((project, index) => {
                    const benefitedHHs = project.directBeneficiaries
                      ? (Number(project.directBeneficiaries.male) || 0) +
                        (Number(project.directBeneficiaries.female) || 0)
                      : 0;

                    return (
                      <tr
                        key={project._id}
                        className={`${
                          index % 2 === 0 ? "bg-emerald-50/30" : "bg-white"
                        } hover:bg-emerald-50/60 transition-colors`}
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {project.name}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {getImplementingAreasText(project.implementingAreas)}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {project.donor || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-semibold text-emerald-700">
                          {project.budget
                            ? `৳${Number(project.budget).toLocaleString()}`
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {project.startDate && project.endDate
                            ? `${project.startDate} to ${project.endDate}`
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-medium">
                          {benefitedHHs} HHs
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              project.projectState === "Current"
                                ? "bg-emerald-100 text-emerald-800"
                                : project.projectState === "Hold"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-teal-100 text-teal-800"
                            }`}
                          >
                            {project.projectState === "Current"
                              ? "Ongoing"
                              : project.projectState === "Hold"
                                ? "Hold"
                                : "Completed"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              navigate(`/project-details/${project._id}`, {
                                state: { project },
                              })
                            }
                            className="text-emerald-600 hover:text-emerald-800 font-semibold transition-colors"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-emerald-100">
            <p className="text-gray-500 text-lg">
              No projects available for this activity at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitiesDetail;
