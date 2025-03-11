import React, { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import { HiDownload } from "react-icons/hi";

const reports = [
  {
    id: 1,
    title: "Annual Report 2023",
    code: "AR-2023",
    year: "2023",
    fileUrl: "/assets/RDF-Annual-Report-2022-23.pdf",
    coverImageUrl: "/assets/annual-report-cover.png",
  },
  {
    id: 2,
    title: "Annual Report 2022",
    code: "AR-2022",
    year: "2022",
    fileUrl: "/reports/annual_report_2022.pdf",
    coverImageUrl: "/assets/Screenshot_6.jpg",
  },
  {
    id: 3,
    title: "Annual Report 2021",
    code: "AR-2021",
    year: "2021",
    fileUrl: "/reports/annual_report_2021.pdf",
    coverImageUrl: "/assets/annual-report-cover2.png",
  },
];

const AnnualReport = () => {
  const [searchYear, setSearchYear] = useState("");
  // useEffect(() => {
  //   window.scrollTo(0, 0); // Scroll to the top when the route changes
  // }, []);

  const handleDownload = (fileUrl, title) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter reports based on search year
  const filteredReports = searchYear
    ? reports.filter((report) => report.year.includes(searchYear))
    : reports;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Cover Section */}
      <PageCoverPhoto
        title="Our Annual Report"
        subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
        imageUrl="/assets/annulreportcover.jpg"
      />

      {/* Filter Section */}
      <motion.div
        className="container mx-auto px-6 py-6 font-serif"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <label className="text-gray-700 font-medium">Filter by Year:</label>
          <input
            type="text"
            placeholder="Enter year (e.g. 2023)"
            className="p-2 border rounded-lg w-40 text-center shadow-sm"
            onChange={(e) => setSearchYear(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Report Cards */}
      <div className="container mx-auto max-w-7xl px-6 py-6">
        <motion.h1
          className="text-3xl font-bold text-center text-blue-600 mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Annual Reports
        </motion.h1>

        {/* Responsive Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          {filteredReports.length > 0 ? (
            filteredReports.map((report, index) => (
              <motion.div
                key={report.id}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-transform transform hover:-translate-y-1 flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.01 }}
              >
                {/* Cover Image */}
                <motion.img
                  src={report.coverImageUrl}
                  alt={`Cover of ${report.title}`}
                  className="w-64 h-80 object-cover rounded-lg mb-4 shadow-md"
                  whileHover={{ scale: 1.1 }}
                />

                {/* Report Title */}
                <h2 className="text-xl font-semibold text-gray-800 text-center">
                  {report.title}
                </h2>

                {/* Report Code */}
                <p className="text-gray-500 mt-1">
                  Report Code: <span className="font-bold">{report.code}</span>
                </p>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                  {/* View Report */}
                  <motion.a
                    href={report.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-info px-4 py-2 transition duration-300 ease-in-out shadow-md"
                    whileHover={{ scale: 1.1 }}
                  >
                    View Report
                  </motion.a>

                  {/* Download Report */}
                  <motion.button
                    onClick={() => handleDownload(report.fileUrl, report.title)}
                    className="bg-gradient-to-r btn btn-outline btn-success px-5 py-2.5 flex items-center gap-2 shadow-md transition-all duration-300 ease-in-out"
                    whileHover={{ scale: 1.1 }}
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
