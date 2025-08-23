import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hook/useAxiosPublice.jsx";
import { FiMaximize, FiSearch } from "react-icons/fi";
import { ClipLoader } from "react-spinners";

const PolicyDoc = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const AxiosPublice = useAxiosPublic();

  useEffect(() => {
    setLoading(true);
    AxiosPublice.get("/api/admin/policies")
      .then((res) => {
        setPolicies(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch policies:", error);
      })
      .finally(() => {
        setLoading(false);
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
      className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 pb-10"
    >
      <Helmet>
        <title>RDF - Policies</title>
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-r from-green-400 to-green-400 text-white py-16 text-center shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4"> Policies</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Read our policies carefully before using our services.
          </p>
        </div>
      </div>

      {/* Search Box */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg  p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-green-600" />
            </div>
            <input
              type="text"
              placeholder="Search policy by name..."
              className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Policies Grid */}
      <div className="container mx-auto max-w-7xl px-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <ClipLoader color="#16a34a" size={50} />
          </div>
        ) : filteredPolicies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPolicies.map((policy) => {
              const pdfViewerUrl = `${baseURL}${policy.filePath}#toolbar=0&navpanes=0&scrollbar=0&disablePrint=true&disableDownload=true`;

              return (
                <div
                  key={policy._id}
                  className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* PDF Preview */}
                  <div className="relative pt-[120%] bg-gray-50 ">
                    <iframe
                      id={`pdf-frame-${policy._id}`}
                      src={pdfViewerUrl}
                      className="absolute top-0 left-0 w-full h-full border-0"
                      title={policy.name}
                      allow="fullscreen"
                    />
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
                      className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition z-10"
                      title="Fullscreen"
                      aria-label="View fullscreen"
                    >
                      <FiMaximize className="text-green-700 text-lg" />
                    </button>
                  </div>

                  {/* Policy Name */}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 text-center">
                      {policy.name}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm max-w-2xl mx-auto">
            <div className="text-gray-500 text-xl mb-4">
              {searchTerm ? (
                <>
                  No policies found matching "
                  <span className="font-semibold">{searchTerm}</span>"
                </>
              ) : (
                "No policies available at the moment"
              )}
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicyDoc;
