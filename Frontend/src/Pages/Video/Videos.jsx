import React, { useEffect, useState } from "react";
import useRDFStore from "../../storage/useRDFstorage";
import { Helmet } from "react-helmet-async";

const Videos = () => {
  const { video, fetchVideo, isLoading } = useRDFStore();
  useEffect(() => {
    if (video.length === 0) {
      fetchVideo();
    }
  }, []);
  console.log(video);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleVideos, setVisibleVideos] = useState(9); // Show 3 videos initially

  // Filter videos based on search input
  const filteredVideos = video.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Load more videos
  const loadMoreVideos = () => {
    setVisibleVideos((prev) => prev + 3);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 ">
      <Helmet>
        <title> RDF-videos </title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6 mt-16 md:mt-4">
        DRF Video Gallery
      </h1>

      {/* Search Input */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredVideos.length > 0 ? (
          filteredVideos.slice(0, visibleVideos).map((video) => (
            <div key={video._id} className="bg-white shadow-lg rounded-lg">
              <div className="relative w-full h-56">
                <iframe
                  className="w-full h-full rounded-t-lg"
                  src={`https://www.youtube.com/embed/${video.videoUrl}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <h2 className="text-sm font-semibold text-center flex-1">
                  {video.title}
                </h2>
                <p className="text-xs text-gray-500 whitespace-nowrap">
                  {video.publishedDate}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-gray-700"></div>
            <p className="text-lg ml-3">Loading...</p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex  items-center mt-8 space-x-4 justify-center ">
        {/* Load More Button */}
        {visibleVideos < filteredVideos.length && (
          <button
            onClick={loadMoreVideos}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Load More
          </button>
        )}

        {/* Subscribe Button */}
        <a
          href="https://www.youtube.com/@rdfbd1995"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Subscribe
        </a>
      </div>
    </div>
  );
};

export default Videos;
