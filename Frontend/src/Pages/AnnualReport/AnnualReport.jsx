import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import { HiDownload } from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import useRDFStore from "../../storage/useRDFstorage";

const AnnualReport = () => {
  const [searchYear, setSearchYear] = useState("");
  const { reports, fetchReport } = useRDFStore();
  useEffect(() => {
    if (reports.length === 0) {
      fetchReport();
    }
  }, []);

  //console.log(reports);
  const handleDownload = (fileUrl, title) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const sortedReports = [...reports].sort(
    (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
  );

  // Filter reports based on search year
  const filteredReports = searchYear
    ? sortedReports.filter((report) => report.title.includes(searchYear))
    : sortedReports;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-green-50"
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

      {/* Cover Section */}
      {/* <PageCoverPhoto
        title="ANNUAL REPORT"
        subtitle="Creating Sustainable Impact Through Transformation"
      /> */}

      {/* Filter Section */}
      <motion.div
        className="container mx-auto px-6 py-6 font-serif"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <label className="text-green-400 font-medium">Filter by Year:</label>
          <input
            type="text"
            placeholder="Enter title (e.g. 2023)"
            className="p-2 border rounded-lg w-40 text-center "
            onChange={(e) => setSearchYear(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Report Cards */}
      <div className="container mx-auto max-w-6xl px-6 py-4 ">
        <motion.h1
          className="text-3xl font-bold text-center text-blue-600 mb-8 font-serif"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Annual Reports
        </motion.h1>

        {/* Responsive Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          {filteredReports.length > 0 ? (
            filteredReports.map((report, index) => (
              <motion.div
                key={report.id}
                className=" shadow-lg rounded-xl w-72 p-4 border border-gray-200 hover:shadow-xl transition-transform transform hover:-translate-y-1 flex flex-col items-center bg-white"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.01 }}
              >
                {/* Cover Image */}
                <motion.img
                  src={report.coverImage}
                  alt={`Cover of ${report.title}`}
                  className="w-64 h-80 object-cover rounded-lg mb-2 shadow-md"
                  whileHover={{ scale: 1 }}
                />

                {/* Report Title */}
                <h2 className="text-xl font-semibold text-orange-400 text-center">
                  {report.title}
                </h2>

                {/* Report Code */}

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                  {/* View Report */}
                  <motion.a
                    href={`http://localhost:3001${report.filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-info px-4 py-2 transition duration-300 ease-in-out shadow-md"
                    whileHover={{ scale: 1 }}
                  >
                    View Report
                  </motion.a>

                  {/* Download Report */}
                  <motion.button
                    onClick={() =>
                      handleDownload(report.filePath, report.title)
                    }
                    className="bg-gradient-to-r btn btn-outline btn-success px-5 py-2.5 flex items-center gap-2 shadow-md transition-all duration-300 ease-in-out"
                    whileHover={{ scale: 1 }}
                  >
                    <HiDownload className="w-5 h-5" />
                    Download
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No reports found for the entered year.
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnnualReport;
