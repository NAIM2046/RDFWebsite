import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiDownload } from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import useRDFStore from "../../storage/useRDFstorage";

const AnnualReport = () => {
  const [searchYear, setSearchYear] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);
  const { reports, fetchReport, isLoading } = useRDFStore();

  useEffect(() => {
    if (reports.length === 0) {
      fetchReport();
    }
  }, []);

  const handleDownload = async (fileUrl, title, reportId) => {
    try {
      setDownloadingId(reportId);

      const response = await fetch(`https://api.rdfbd.org${fileUrl}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${title.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      setTimeout(() => {
        setDownloadingId(null);
      }, 1000);
    } catch (error) {
      console.error("Download failed:", error);
      setDownloadingId(null);

      const link = document.createElement("a");
      link.href = `https://api.rdfbd.org${fileUrl}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const sortedReports = [...reports].sort(
    (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
  );

  const filteredReports = searchYear
    ? sortedReports.filter((report) => report.title.includes(searchYear))
    : sortedReports;

  // Loading Skeleton Component
  const ReportCardSkeleton = () => (
    <div className="shadow-lg rounded-xl w-full max-w-xs sm:max-w-sm md:w-72 p-4 border border-gray-200 flex flex-col items-center bg-white animate-pulse mx-auto">
      {/* Cover Image Skeleton */}
      <div className="w-full h-64 sm:h-72 md:h-80 bg-gray-300 rounded-lg mb-4"></div>

      {/* Title Skeleton */}
      <div className="h-5 sm:h-6 bg-gray-300 rounded w-3/4 mb-3"></div>

      {/* Buttons Skeleton */}
      <div className="flex gap-3 sm:gap-4 mt-4 w-full justify-center">
        <div className="h-8 sm:h-10 bg-gray-300 rounded w-16 sm:w-20"></div>
        <div className="h-8 sm:h-10 bg-gray-300 rounded w-20 sm:w-24"></div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-green-50 min-h-screen"
    >
      <Helmet>
        <title>
          RDF Annual Reports | Resource Development Foundation (RDF)
        </title>
        <meta
          name="description"
          content="Explore the latest and past annual reports of Resource Development Foundation (RDF), highlighting our achievements, projects, and impact in sustainable community development."
        />
      </Helmet>

      {/* Filter Section */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 py-6 md:py-8 font-serif mt-15 md:mt-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-sm max-w-md mx-auto">
          <label className="text-green-600 font-medium text-base sm:text-lg whitespace-nowrap">
            Filter by Year:
          </label>
          <input
            type="text"
            placeholder="e.g. 2023, 2022"
            className="p-2 sm:p-3 border border-gray-300 rounded-lg w-32 sm:w-40 text-center focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-sm sm:text-base"
            onChange={(e) => setSearchYear(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-3 sm:px-6 py-6 md:py-8">
        <motion.h1
          className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-6 md:mb-8 font-serif px-2"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Annual Reports
        </motion.h1>

        {/* Loading State */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            {/* Animated Loader */}
            <div className="text-center mb-6 md:mb-8">
              <div className="relative inline-block">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-green-200 rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-green-600 rounded-full animate-spin"></div>
              </div>
              <motion.p
                className="text-gray-600 mt-3 sm:mt-4 text-base sm:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Loading Annual Reports...
              </motion.p>
            </div>

            {/* Skeleton Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-center w-full">
              {[...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-center"
                >
                  <ReportCardSkeleton />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Reports Grid */
          <motion.div
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            {filteredReports.length > 0 ? (
              filteredReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  className="shadow-lg rounded-xl w-full max-w-xs sm:max-w-sm md:w-72 p-3 sm:p-4 border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-center items-center bg-white group mx-auto"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Cover Image */}
                  <motion.div
                    className="relative overflow-hidden rounded-lg mb-3 sm:mb-4 w-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={report.coverImage}
                      alt={`Cover of ${report.title}`}
                      className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>

                  {/* Report Title */}
                  <h2 className="text-lg sm:text-xl font-semibold text-orange-500 text-center mb-2 line-clamp-2 px-1">
                    {report.title}
                  </h2>

                  {/* Buttons */}
                  <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 w-full justify-center">
                    {/* View Report */}
                    <motion.a
                      href={`https://api.rdfbd.org${report.filePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md text-xs sm:text-sm font-medium whitespace-nowrap"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Report
                    </motion.a>

                    {/* Download Report */}
                    <motion.button
                      onClick={() =>
                        handleDownload(report.filePath, report.title, report.id)
                      }
                      disabled={downloadingId === report.id}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-2 rounded-lg transition-all duration-300 shadow-md text-xs sm:text-sm font-medium whitespace-nowrap ${
                        downloadingId === report.id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                      }`}
                      whileHover={
                        downloadingId !== report.id ? { scale: 1.05 } : {}
                      }
                      whileTap={
                        downloadingId !== report.id ? { scale: 0.95 } : {}
                      }
                    >
                      {downloadingId === report.id ? (
                        <>
                          <svg
                            className="animate-spin h-3 w-3 sm:h-4 sm:w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span className="text-xs sm:text-sm">
                            Downloading...
                          </span>
                        </>
                      ) : (
                        <>
                          <HiDownload className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm">Download</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                  {/* Download Progress Indicator */}
                  {downloadingId === report.id && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "100%" }}
                      className="mt-2 bg-gray-200 rounded-full h-1"
                    >
                      <div className="bg-green-500 h-1 rounded-full animate-pulse"></div>
                    </motion.div>
                  )}
                </motion.div>
              ))
            ) : (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-full text-center py-8 sm:py-12"
              >
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md max-w-md mx-auto">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
                    {searchYear
                      ? `No reports found for ${searchYear}`
                      : "No reports available"}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base">
                    {searchYear
                      ? "Try searching for a different year"
                      : "Check back later for new reports"}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AnnualReport;
