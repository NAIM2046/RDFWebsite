import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  FiCalendar,
  FiClock,
  FiAlertTriangle,
  FiArrowRight,
} from "react-icons/fi";

const Notices = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample notice data
  const notices = [
    {
      id: 1,
      title: "Annual General Meeting 2023",
      date: "2023-11-15",
      time: "10:00 AM",
      category: "meeting",
      priority: "high",
      content:
        "All members are requested to attend the Annual General Meeting at the main auditorium. Agenda includes financial review and election of new board members.",
    },
    {
      id: 2,
      title: "System Maintenance Scheduled",
      date: "2023-11-20",
      time: "2:00 AM - 5:00 AM",
      category: "maintenance",
      priority: "medium",
      content:
        "Our online portal will be unavailable during the maintenance window. Please plan your activities accordingly.",
    },
    {
      id: 3,
      title: "Holiday Schedule Announcement",
      date: "2023-12-25",
      time: "All Day",
      category: "holiday",
      priority: "low",
      content:
        "Office will remain closed on December 25th for Christmas holiday.",
    },
    {
      id: 4,
      title: "Deadline Extension for Project Submissions",
      date: "2023-11-30",
      time: "5:00 PM",
      category: "deadline",
      priority: "high",
      content:
        "The deadline for project submissions has been extended to November 30th. Please submit your documents through the portal.",
    },
  ];

  // Filter notices based on active tab and search term
  const filteredNotices = notices.filter((notice) => {
    const matchesTab = activeTab === "all" || notice.category === activeTab;
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>RDF - Notices & Announcements</title>
        <meta
          name="description"
          content="Latest notices and announcements from RDF organization"
        />
      </Helmet>

      {/* Page Header */}
      <div className="bg-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Notices & Announcements
          </h1>
          <p className="mt-2 text-lg text-blue-100">
            Stay updated with the latest news and important information
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search notices..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeTab === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All Notices
              </button>
              <button
                onClick={() => setActiveTab("meeting")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeTab === "meeting"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Meetings
              </button>
              <button
                onClick={() => setActiveTab("deadline")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeTab === "deadline"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Deadlines
              </button>
              <button
                onClick={() => setActiveTab("holiday")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeTab === "holiday"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Holidays
              </button>
            </div>
          </div>
        </div>

        {/* Notices List */}
        <div className="space-y-6">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        {notice.priority === "high" && (
                          <FiAlertTriangle className="text-red-500 mr-2" />
                        )}
                        <h2 className="text-xl font-semibold text-gray-800">
                          {notice.title}
                        </h2>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <FiCalendar className="mr-1" />
                          {formatDate(notice.date)}
                        </span>
                        <span className="flex items-center">
                          <FiClock className="mr-1" />
                          {notice.time}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {notice.category.charAt(0).toUpperCase() +
                            notice.category.slice(1)}
                        </span>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 flex items-center">
                      View Details <FiArrowRight className="ml-1" />
                    </button>
                  </div>
                  <p className="mt-4 text-gray-600">{notice.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h3 className="text-lg font-medium text-gray-700">
                No notices found
              </h3>
              <p className="mt-2 text-gray-500">
                {searchTerm
                  ? "Try adjusting your search or filter"
                  : "There are currently no notices in this category"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notices;
