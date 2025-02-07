import React from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import coverIma from "/assets/annulreportcover.jpg";
import { HiDownload } from "react-icons/hi";
const reports = [
  {
    id: 1,
    title: "Annual Report 2023",
    code: "AR-2023",
    fileUrl: "/assets/RDF-Annual-Report-2022-23.pdf",
    coverImageUrl: "/assets/annual-report-cover.png", // Add cover image URL
  },
  {
    id: 2,
    title: "Annual Report 2022",
    code: "AR-2022",
    fileUrl: "/reports/annual_report_2022.pdf",
    coverImageUrl: "/assets/Screenshot_6.jpg", // Add cover image URL
  },
  {
    id: 3,
    title: "Annual Report 2021",
    code: "AR-2021",
    fileUrl: "/reports/annual_report_2021.pdf",
    coverImageUrl: "/assets/annual-report-cover2.png", // Add cover image URL
  },
];

const AnnualReport = () => {
  const handleDownload = (fileUrl, title) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = title + ".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <PageCoverPhoto
        title="Our Annual Report"
        subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
        imageUrl={coverIma}
      ></PageCoverPhoto>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl mt-5 font-bold text-center text-blue-600 mb-6">
          Annual Reports
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white shadow-lg rounded-lg p-4 border border-gray-300 text-center justify-items-center"
            >
              {/* Display cover image */}
              <img
                src={report.coverImageUrl}
                alt={`Cover of ${report.title}`}
                className="w-96 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {report.title}
              </h2>
              <p className="text-gray-500 mt-1">
                Report Code: <span className="font-bold">{report.code}</span>
              </p>
              <div className="flex justify-center gap-4 mt-4">
                {/* View Button */}
                <a
                  href={report.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
                >
                  View Report
                </a>
                {/* Download Button */}
                <button
                  onClick={() => handleDownload(report.fileUrl, report.title)}
                  className="text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-blue-800 transition-all duration-300 ease-in-out shadow-md cursor-pointer"
                >
                  <HiDownload className="w-5 h-5 me-2" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnualReport;
