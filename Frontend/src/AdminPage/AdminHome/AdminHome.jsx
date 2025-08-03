import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  FiUsers,
  FiFileText,
  FiActivity,
  FiBriefcase,
  FiLayers,
  FiTrendingUp,
  FiCalendar,
  FiDollarSign,
  FiArrowUpRight,
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

  // Recent activities sample data
  const recentActivities = [
    {
      id: 1,
      type: "Event",
      title: "Annual Conference",
      date: "2023-06-15",
      icon: <FiActivity className="text-blue-500" />,
    },
    {
      id: 2,
      type: "News",
      title: "New Partnership Announcement",
      date: "2023-06-10",
      icon: <FiFileText className="text-green-500" />,
    },
    {
      id: 3,
      type: "Program",
      title: "Education Initiative Launch",
      date: "2023-06-05",
      icon: <FiBriefcase className="text-purple-500" />,
    },
    {
      id: 4,
      type: "Project",
      title: "Community Development Phase 2",
      date: "2023-05-28",
      icon: <FiLayers className="text-yellow-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Helmet>
        <title>RDF Admin Dashboard</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">
              Welcome back! Here's what's happening with your organization.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <FiCalendar className="text-gray-400" />
            <span className="text-gray-600">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Programs</p>
                <h3 className="text-2xl font-bold mt-1">{programs.length}</h3>
                <p className="text-xs text-green-500 mt-2 flex items-center">
                  <FiTrendingUp className="mr-1" /> 12% from last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 text-blue-500">
                <FiBriefcase className="text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Events</p>
                <h3 className="text-2xl font-bold mt-1">{events.length}</h3>
                <p className="text-xs text-green-500 mt-2 flex items-center">
                  <FiTrendingUp className="mr-1" /> 8% from last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 text-green-500">
                <FiActivity className="text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">News</p>
                <h3 className="text-2xl font-bold mt-1">{newss.length}</h3>
                <p className="text-xs text-red-500 mt-2 flex items-center">
                  <FiTrendingUp className="mr-1 transform rotate-180" /> 5% from
                  last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-50 text-yellow-500">
                <FiFileText className="text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Partners</p>
                <h3 className="text-2xl font-bold mt-1">{partners.length}</h3>
                <p className="text-xs text-green-500 mt-2 flex items-center">
                  <FiTrendingUp className="mr-1" /> 15% from last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-red-50 text-red-500">
                <FiUsers className="text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Projects</p>
                <h3 className="text-2xl font-bold mt-1">{projects.length}</h3>
                <p className="text-xs text-green-500 mt-2 flex items-center">
                  <FiTrendingUp className="mr-1" /> 20% from last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 text-purple-500">
                <FiLayers className="text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Overview Section (replaces charts) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Content Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Programs</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{programs.length}</span>
                  <span className="text-xs text-green-500 flex items-center">
                    <FiArrowUpRight className="mr-1" /> 12%
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Events</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{events.length}</span>
                  <span className="text-xs text-green-500 flex items-center">
                    <FiArrowUpRight className="mr-1" /> 8%
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">News</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{newss.length}</span>
                  <span className="text-xs text-red-500 flex items-center">
                    <FiArrowUpRight className="mr-1 transform rotate-180" /> 5%
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Partners</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{partners.length}</span>
                  <span className="text-xs text-green-500 flex items-center">
                    <FiArrowUpRight className="mr-1" /> 15%
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Projects</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{projects.length}</span>
                  <span className="text-xs text-green-500 flex items-center">
                    <FiArrowUpRight className="mr-1" /> 20%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="p-2 mr-3 rounded-lg bg-blue-50 text-blue-500">
                  <FiActivity className="text-lg" />
                </div>
                <div>
                  <p className="font-medium">New event scheduled</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-2 mr-3 rounded-lg bg-green-50 text-green-500">
                  <FiFileText className="text-lg" />
                </div>
                <div>
                  <p className="font-medium">News article published</p>
                  <p className="text-sm text-gray-500">5 days ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-2 mr-3 rounded-lg bg-purple-50 text-purple-500">
                  <FiBriefcase className="text-lg" />
                </div>
                <div>
                  <p className="font-medium">Program application deadline</p>
                  <p className="text-sm text-gray-500">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="p-2 mr-4 rounded-lg bg-gray-100">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{activity.title}</h4>
                  <p className="text-sm text-gray-500">
                    {activity.type} •{" "}
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
                <button className="text-sm text-blue-500 hover:text-blue-700">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Upcoming Events
                </p>
                <h3 className="text-xl font-bold mt-1 text-blue-900">5</h3>
              </div>
              <FiCalendar className="text-2xl text-blue-500" />
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">
                  Active Projects
                </p>
                <h3 className="text-xl font-bold mt-1 text-green-900">8</h3>
              </div>
              <FiLayers className="text-2xl text-green-500" />
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800">
                  Funding This Month
                </p>
                <h3 className="text-xl font-bold mt-1 text-purple-900">
                  $24,500
                </h3>
              </div>
              <FiDollarSign className="text-2xl text-purple-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
