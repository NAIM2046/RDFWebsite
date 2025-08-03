import React, { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaList,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaImage,
  FaProjectDiagram,
  FaRunning,
  FaUsers,
  FaNewspaper,
  FaPhotoVideo,
  FaCalendarAlt,
  FaHandshake,
  FaUserShield,
  FaChartBar,
  FaFileContract,
  FaAward,
} from "react-icons/fa";

const Admin = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin-rdf");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between bg-white shadow p-4 sticky top-0 z-10">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 text-gray-700 lg:hidden"
          >
            {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <h1 className="text-2xl font-bold text-gray-700">Admin Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </header>

      {/* Dashboard Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Hidden on mobile unless toggled */}
        <div
          className={`w-64 bg-gray-800 text-white fixed lg:static h-full lg:h-screen z-20 transition-all duration-300 ${
            sidebarOpen ? "left-0" : "-left-64"
          } lg:left-0`}
        >
          <div className="p-4 h-full overflow-y-auto">
            <ul className="space-y-2 mt-4">
              <li>
                <NavLink
                  to="/admin-rdf"
                  className={`flex items-center p-3 rounded-lg transition-colors hover:bg-gray-700 `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaHome className="mr-3" />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-rdf/slider-info"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaImage className="mr-3" />
                  Slider Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-rdf/program-page"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaProjectDiagram className="mr-3" />
                  Program Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-rdf/project-page"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaList className="mr-3" />
                  Project Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-rdf/activities"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaRunning className="mr-3" />
                  Activities Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-rdf/teams"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaUsers className="mr-3" />
                  Teams Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-rdf/news"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaNewspaper className="mr-3" />
                  News Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-rdf/photos"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaPhotoVideo className="mr-3" />
                  Photo Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-rdf/videos"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaPhotoVideo className="mr-3" />
                  Video Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-rdf/event"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaCalendarAlt className="mr-3" />
                  Event Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-rdf/partner"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaHandshake className="mr-3" />
                  Partner Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-rdf/admin"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaUserShield className="mr-3" />
                  Admin Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-rdf/report"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaChartBar className="mr-3" />
                  Report Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-rdf/policy"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaFileContract className="mr-3" />
                  Policy Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-rdf/certification"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaAward className="mr-3" />
                  Certifications Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaHome className="mr-3" />
                  Public Home
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div
          className={`flex-1 p-4 lg:p-8 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-0"
          } lg:ml-0`}
        >
          {/* Overlay for mobile when sidebar is open */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
