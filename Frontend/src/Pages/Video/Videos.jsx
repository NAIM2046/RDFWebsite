import React, { useEffect, useState } from "react";
import useRDFStore from "../../storage/useRDFstorage";
import { Helmet } from "react-helmet-async";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";

const Videos = () => {
  const { video, fetchVideo, isLoading } = useRDFStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleVideos, setVisibleVideos] = useState(3); // Show 3 videos initially

  useEffect(() => {
    if (video.length === 0) {
      fetchVideo();
    }
  }, [video, fetchVideo]);

  const filteredVideos = video.filter(({ title }) =>
    title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMoreVideos = () => {
    setVisibleVideos((prev) => prev + 3);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>RDF - Video Gallery</title>
      </Helmet>

      <PageCoverPhoto title="Video Gallery" />

      <div className="py-10 px-4 md:px-8">
        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <input
            type="text"
            placeholder="🔍 Search videos by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Video Grid */}
        {isLoading ? (
          <div
            className="flex justify-center items-center py-12"
            aria-live="polite"
          >
            <div className="animate-spin h-10 w-10 border-b-4 border-blue-500 rounded-full mr-4"></div>
            <p className="text-lg text-gray-600">Loading videos...</p>
          </div>
        ) : filteredVideos.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No videos found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredVideos
              .slice(0, visibleVideos)
              .map(({ _id, videoUrl, title, publishedDate }) => (
                <div
                  key={_id || `${title}-${videoUrl}`}
                  className="bg-white rounded-lg shadow hover:shadow-md transition"
                >
                  <div className="relative w-full h-56">
                    <iframe
                      loading="lazy"
                      className="w-full h-full rounded-t-lg"
                      src={`https://www.youtube.com/embed/${videoUrl}`}
                      title={`Video: ${title}`}
                      aria-label={`Embedded video: ${title}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-center truncate mb-1 text-gray-800">
                      {title}
                    </h2>
                    <p className="text-xs text-gray-500 text-end">
                      {publishedDate}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          {visibleVideos < filteredVideos.length && (
            <button
              onClick={loadMoreVideos}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition transform hover:scale-105"
            >
              Load More
            </button>
          )}
          <a
            href="https://www.youtube.com/@rdfbd1995"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition transform hover:scale-105"
          >
            Subscribe on YouTube
          </a>
        </div>
      </div>
    </div>
  );
};

export default Videos;
