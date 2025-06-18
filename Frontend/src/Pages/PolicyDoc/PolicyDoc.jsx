import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hook/useAxiosPublice.jsx";
import { FiMaximize } from "react-icons/fi";

const PolicyDoc = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [policies, setPolicies] = useState([]);
  const AxiosPublice = useAxiosPublic();

  useEffect(() => {
    AxiosPublice.get("/api/admin/policies")
      .then((res) => {
        setPolicies(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch policies:", error);
      });
  }, []);

  const filteredPolicies = policies.filter((policy) =>
    policy.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const baseURL = "http://localhost:3001"; // Replace with deployed backend URL

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if (
          (e.ctrlKey && ["s", "p", "u"].includes(e.key.toLowerCase())) ||
          e.key === "F12"
        ) {
          e.preventDefault();
        }
      }}
      tabIndex={0}
      className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 pb-10"
    >
      <Helmet>
        <title>RDF - Policies</title>
      </Helmet>

      {/* Header */}
      <div className="bg-green-600 text-white py-12 text-center shadow-lg">
        <h1 className="text-4xl font-bold mt-20 lg:mt-0">Our Policies</h1>
        <p className="text-lg mt-2">
          Read our policies carefully before using our services.
        </p>
      </div>

      {/* Search Box */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <label className="text-green-800 font-medium">Search Policy:</label>
          <input
            type="text"
            placeholder="Enter policy name"
            className="p-2 border border-green-300 rounded-lg w-72 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Policies Grid */}
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPolicies.length > 0 ? (
            filteredPolicies.map((policy) => {
              const pdfViewerUrl = `${baseURL}${policy.filePath}#toolbar=0&navpanes=0&scrollbar=0&disablePrint=true&disableDownload=true`;

              return (
                <div
                  key={policy._id}
                  className="bg-white shadow-md rounded-xl p-4 relative group hover:shadow-xl transition-all duration-300"
                >
                  {/* Fullscreen Button */}
                  <button
                    onClick={() => {
                      const iframe = document.getElementById(
                        `pdf-frame-${policy._id}`
                      );
                      if (iframe.requestFullscreen) {
                        iframe.requestFullscreen();
                      } else if (iframe.webkitRequestFullscreen) {
                        iframe.webkitRequestFullscreen();
                      } else if (iframe.mozRequestFullScreen) {
                        iframe.mozRequestFullScreen();
                      } else if (iframe.msRequestFullscreen) {
                        iframe.msRequestFullscreen();
                      }
                    }}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition z-10"
                    title="Fullscreen"
                  >
                    <FiMaximize className="text-green-700 text-xl" />
                  </button>

                  {/* PDF Preview */}
                  <iframe
                    id={`pdf-frame-${policy._id}`}
                    src={pdfViewerUrl}
                    className="w-full h-80 sm:h-96 rounded-lg border mt-2"
                    title={policy.name}
                    allow="fullscreen"
                  />

                  {/* Policy Name */}
                  <h2 className="mt-4 text-center text-gray-800 font-semibold text-lg font-serif">
                    {policy.name}
                  </h2>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-600 text-lg w-full col-span-3">
              No policies found for the entered search term.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicyDoc;
