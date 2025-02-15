import React, { useState } from "react";

const videos = [
  {
    id: 1,
    title: "NGO Education Program",
    src: "https://www.youtube.com/embed/vrgfD6OjAJE",
    date: "Published on Jan 10, 2024",
  },
  {
    id: 2,
    title: "Health Camp Initiative",
    src: "https://www.youtube.com/embed/fZAeUuiV6q0",
    date: "Published on Feb 5, 2024",
  },
  {
    id: 3,
    title: "Food Distribution Drive",
    src: "https://www.youtube.com/embed/9P2nXkTqU4E",
    date: "Published on Mar 20, 2024",
  },
  {
    id: 4,
    title: "Women Empowerment Workshop",
    src: "https://www.youtube.com/embed/Y3mxv9FBgok",
    date: "Published on Apr 15, 2024",
  },
  {
    id: 5,
    title: "Disaster Relief Efforts",
    src: "https://www.youtube.com/embed/9xRMVmi_qb8",
    date: "Published on May 30, 2024",
  },
  {
    id: 6,
    title: "Tree Plantation Drive",
    src: "https://www.youtube.com/embed/9xRMVmi_qb8",
    date: "Published on Jun 10, 2024",
  },
];

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleVideos, setVisibleVideos] = useState(3); // Show 3 videos initially

  // Filter videos based on search input
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Load more videos
  const loadMoreVideos = () => {
    setVisibleVideos((prev) => prev + 3);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 mt-20">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        NGO Video Gallery
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
            <div key={video.id} className="bg-white shadow-lg rounded-lg">
              <div className="relative w-full h-56">
                <iframe
                  className="w-full h-full rounded-t-lg"
                  src={video.src}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 text-center">
                <h2 className="text-sm font-semibold">{video.title}</h2>
                <p className="text-xs text-gray-500 mt-1">{video.date}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No videos found.
          </p>
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
