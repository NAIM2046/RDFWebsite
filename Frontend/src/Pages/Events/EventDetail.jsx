import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ShareAndComment from "../../Components/Navber/AllProjects/ShareAndComment";

const EventDetail = () => {
  const location = useLocation();
  const { event } = location.state;
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Format date for better display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Create structured data for the event
  const eventStructuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    description: event.description,
    image: event.images[0],
    location: {
      "@type": "Place",
      name: event.location,
      address: event.location,
    },
    offers: {
      "@type": "Offer",
      url: window.location.href,
      availability:
        event.type === "Upcoming"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
    },
  };

  const openGallery = (index = 0) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when gallery is open
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  const navigateGallery = (direction) => {
    let newIndex;
    if (direction === "prev") {
      newIndex =
        (selectedImageIndex - 1 + event.images.length) % event.images.length;
    } else {
      newIndex = (selectedImageIndex + 1) % event.images.length;
    }
    setSelectedImageIndex(newIndex);
  };

  return (
    <>
      <Helmet>
        <title>{event.title} | RDF Events</title>
        <meta
          name="description"
          content={event.description.substring(0, 160)}
        />
        <script type="application/ld+json">
          {JSON.stringify(eventStructuredData)}
        </script>
      </Helmet>

      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {event.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formatDate(event.date)}
                </span>

                {event.time && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {event.time}
                  </span>
                )}

                {event.location && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {event.location}
                  </span>
                )}
              </div>
            </header>

            {/* Event Image */}
            <figure
              className="mb-8 cursor-pointer"
              onClick={() => openGallery(0)}
            >
              <img
                src={event.images[0]}
                alt={`Main visual for ${event.title}`}
                className="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg"
                loading="eager"
              />
              <figcaption className="mt-2 text-sm text-gray-500 text-center">
                {event.title} event visual (click to enlarge)
              </figcaption>
            </figure>

            {/* Event Description */}
            <section className="prose max-w-none">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Event Details
              </h2>
              <div className="text-gray-700 space-y-4">
                {event.description.split("\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Gallery Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Event Gallery
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {event.images.slice(1, 5).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Event gallery image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                    loading="lazy"
                    onClick={() => openGallery(index + 1)}
                  />
                ))}
              </div>
              <button
                className="mt-4 w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
                onClick={() => openGallery(0)}
              >
                View All Photos ({event.images.length})
              </button>
            </section>

            {/* Share Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <ShareAndComment />
            </section>
          </aside>
        </article>
      </main>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            className="absolute top-4 right-4 text-white text-4xl z-50"
            onClick={closeGallery}
          >
            &times;
          </button>

          <div className="relative w-full max-w-6xl h-full max-h-screen">
            <img
              src={event.images[selectedImageIndex]}
              alt={`Gallery image ${selectedImageIndex + 1}`}
              className="w-full h-full object-contain"
            />

            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button
                className="text-white text-4xl bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
                onClick={() => navigateGallery("prev")}
              >
                &larr;
              </button>
              <button
                className="text-white text-4xl bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
                onClick={() => navigateGallery("next")}
              >
                &rarr;
              </button>
            </div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <div className="flex space-x-2 overflow-x-auto max-w-full p-2">
                {event.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-16 h-16 object-cover cursor-pointer ${
                      index === selectedImageIndex
                        ? "ring-2 ring-blue-500"
                        : "opacity-70"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            <div className="absolute top-4 left-4 text-white">
              Image {selectedImageIndex + 1} of {event.images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetail;
