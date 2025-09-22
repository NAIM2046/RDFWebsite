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

  const baseURL = "https://api.rdfbd.org";

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>RDF - Policies</title>
      </Helmet>

      {/* Simple Header */}
      <div className="bg-green-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Policies</h1>
          <p className="mt-2 text-green-100">Resource Development Foundation</p>
        </div>
      </div>

      {/* Search Box */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-green-600" />
            </div>
            <input
              type="text"
              placeholder="Search policy by name..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Policies Grid */}
      <div className="container mx-auto px-4 pb-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <ClipLoader color="#16a34a" size={50} />
            <span className="ml-3 text-gray-600">Loading policies...</span>
          </div>
        ) : filteredPolicies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPolicies.map((policy) => {
              const pdfViewerUrl = `${baseURL}${policy.filePath}#toolbar=0&navpanes=0&scrollbar=0`;

              return (
                <div
                  key={policy._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {/* PDF Preview */}
                  <div className="relative h-96 bg-gray-100">
                    <iframe
                      src={pdfViewerUrl}
                      className="w-full h-full"
                      title={policy.name}
                    />
                    <button
                      onClick={() => {
                        const iframe = document.querySelector(
                          `iframe[title="${policy.name}"]`
                        );
                        if (iframe.requestFullscreen) {
                          iframe.requestFullscreen();
                        }
                      }}
                      className="absolute top-2 right-2 bg-white p-2 rounded shadow hover:bg-gray-100"
                      title="Fullscreen"
                    >
                      <FiMaximize className="text-green-700" />
                    </button>
                  </div>

                  {/* Policy Name */}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 text-center">
                      {policy.name}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg p-8 max-w-md mx-auto shadow">
              <p className="text-gray-600 text-lg">
                {searchTerm
                  ? `No policies found for "${searchTerm}"`
                  : "No policies available"}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicyDoc;
