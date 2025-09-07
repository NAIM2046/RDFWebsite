import React, { useEffect, useState, useCallback } from "react";
import useRDFStore from "../../storage/useRDFstorage";
import { Helmet } from "react-helmet-async";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
const Videos = () => {
  const { video, fetchVideo, isLoading, error } = useRDFStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleVideos, setVisibleVideos] = useState(6); // Show 6 videos initially
  const [isFetching, setIsFetching] = useState(false);

  // Fetch videos on initial render
  useEffect(() => {
    if (video.length === 0 && !isLoading) {
      fetchVideo();
    }
  }, [video, fetchVideo, isLoading]);

  // Debounced search filtering
  const filteredVideos = useCallback(() => {
    return video.filter(({ title }) =>
      title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [video, searchTerm]);

  // Load more videos with loading state
  const loadMoreVideos = () => {
    setIsFetching(true);
    setTimeout(() => {
      setVisibleVideos((prev) => prev + 6);
      setIsFetching(false);
    }, 300);
  };

  // Extract YouTube ID from URL if needed
  const getYouTubeId = (url) => {
    if (!url) return "";
    // If it's already an ID, return it
    if (!url.includes("http")) return url;

    // Otherwise extract ID from URL
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>RDF - Video Gallery</title>
        <meta
          name="description"
          content="Browse our collection of videos showcasing our work and initiatives"
        />
      </Helmet>

      {/* <PageCoverPhoto title="Video Gallery" /> */}

      <div className="py-10 px-4 md:px-8 lg:px-16">
        {/* Search */}
        <div className="max-w-2xl mx-auto mb-10">
          <input
            type="text"
            placeholder="🔍 Search videos by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            aria-label="Search videos"
          />
        </div>

        {/* Video Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">Loading videos...</p>
          </div>
        ) : filteredVideos().length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {searchTerm
                ? "No matching videos found."
                : "No videos available."}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredVideos()
                .slice(0, visibleVideos)
                .map(({ _id, videoUrl, title, publishedDate, description }) => (
                  <div
                    key={_id || `${title}-${videoUrl}`}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden"
                  >
                    <div className="relative w-full aspect-video">
                      <iframe
                        loading="lazy"
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${getYouTubeId(
                          videoUrl
                        )}`}
                        title={`Video: ${title}`}
                        aria-label={`Embedded video: ${title}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                        {title}
                      </h2>
                      {description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {description}
                        </p>
                      )}
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{formatDate(publishedDate)}</span>
                        <a
                          href={`https://www.youtube.com/watch?v=${getYouTubeId(
                            videoUrl
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                          aria-label={`Watch ${title} on YouTube`}
                        >
                          Watch on YouTube
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Load More Button */}
            {visibleVideos < filteredVideos().length && (
              <div className="text-center mt-10">
                <button
                  onClick={loadMoreVideos}
                  disabled={isFetching}
                  className={`px-6 py-3 rounded-lg shadow transition transform hover:scale-105 ${
                    isFetching
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {isFetching ? "Loading..." : "Load More Videos"}
                </button>
              </div>
            )}
          </>
        )}

        {/* YouTube Subscription CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/@rdfbd1995"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                clipRule="evenodd"
              />
            </svg>
            Subscribe to our YouTube Channel
          </a>
        </div>
      </div>
    </div>
  );
};

export default Videos;
