import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  FiUsers,
  FiFileText,
  FiActivity,
  FiBriefcase,
  FiLayers,
} from "react-icons/fi";
import useRDFStore from "../../storage/useRDFstorage";

const AdminHome = () => {
  const {
    programs,
    events,
    newss,
    partners,
    projects,
    fetchPrograms,
    fetchEvent,
    fetchNews,
    fetchPartner,
    fetchProjects,
  } = useRDFStore();

  useEffect(() => {
    fetchPrograms();
    fetchEvent();
    fetchNews();
    fetchPartner();
    fetchProjects();
  }, [fetchPrograms, fetchEvent, fetchNews, fetchPartner, fetchProjects]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Helmet>
        <title>RDF Admin Dashboard</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-md flex items-center">
          <FiBriefcase className="text-blue-500 text-4xl mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Total Programs</h2>
            <p className="text-gray-600">{programs.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md flex items-center">
          <FiActivity className="text-green-500 text-4xl mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Total Events</h2>
            <p className="text-gray-600">{events.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md flex items-center">
          <FiFileText className="text-yellow-500 text-4xl mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Total News</h2>
            <p className="text-gray-600">{newss.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md flex items-center">
          <FiUsers className="text-red-500 text-4xl mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Total Partners</h2>
            <p className="text-gray-600">{partners.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md flex items-center">
          <FiLayers className="text-purple-500 text-4xl mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Total Projects</h2>
            <p className="text-gray-600">{projects.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
