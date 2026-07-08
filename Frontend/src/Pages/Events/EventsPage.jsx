import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const canonicalUrl = `https://rdfbd.org${location.pathname}`;

  useEffect(() => {
    const fetchAllEvents = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/event`);
        setEvents(response.data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllEvents();
  }, []);

  // Create structured data for events
  const getStructuredData = () => {
    const upcomingEvents = events.filter((event) => event.type === "Upcoming");
    const pastEvents = events.filter((event) => event.type === "Past");

    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "RDF Events",
      description: "Upcoming and past events organized by RDF",
      url: canonicalUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${canonicalUrl}?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
      hasPart: [
        ...upcomingEvents.map((event) => ({
          "@type": "Event",
          name: event.title,
          startDate: event.startDate,
          endDate: event.endDate,
          location: event.location,
          description: event.description,
          image: event.imageUrl,
        })),
        ...pastEvents.map((event) => ({
          "@type": "Event",
          name: event.title,
          startDate: event.startDate,
          endDate: event.endDate,
          location: event.location,
          description: event.description,
          image: event.imageUrl,
          eventStatus: "EventMovedOnline",
        })),
      ],
    };
  };

  const hasUpcomingEvents = events.some((event) => event.type === "Upcoming");
  const hasPastEvents = events.some((event) => event.type === "Past");
  const pageDescription = hasUpcomingEvents
    ? "Discover upcoming events and relive past events from RDF. Join our community for exciting opportunities."
    : "Explore past events from RDF and stay tuned for future opportunities.";

  // Loading skeleton component
  const EventCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-2/3 mb-4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-4/6"></div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="h-8 bg-gray-300 rounded w-24"></div>
          <div className="h-6 bg-gray-300 rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  // Error state component
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 text-red-500">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Unable to load events
          </h2>
          <p className="text-gray-600 mb-6">
            There was an error loading the events. Please try again later.
          </p>
          <button
            onClick={fetchEvent}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>RDF Events | Upcoming and Past Events</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          property="og:title"
          content="RDF Events | Upcoming and Past Events"
        />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="RDF Events | Upcoming and Past Events"
        />
        <meta name="twitter:description" content={pageDescription} />
        <script type="application/ld+json">
          {JSON.stringify(getStructuredData())}
        </script>
      </Helmet>

      {/* <PageCoverPhoto
        title="Events"
        subtitle={"Creating Sustainable Impact through Transformation"}
      /> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="sr-only">RDF Events</h1>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-16">
            {/* Upcoming Events Loading Skeleton */}
            <section aria-labelledby="upcoming-events-heading">
              <div className="text-center mb-12">
                <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse"></div>
                <div className="w-20 h-1 bg-gray-300 mx-auto animate-pulse"></div>
                <div className="mt-4 h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, index) => (
                  <EventCardSkeleton key={index} />
                ))}
              </div>
            </section>

            {/* Past Events Loading Skeleton */}
            <section aria-labelledby="past-events-heading">
              <div className="text-center mb-12">
                <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4 animate-pulse"></div>
                <div className="w-20 h-1 bg-gray-300 mx-auto animate-pulse"></div>
                <div className="mt-4 h-4 bg-gray-300 rounded w-80 mx-auto animate-pulse"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <EventCardSkeleton key={index} />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Content State */}
        {!isLoading && (
          <>
            {/* Upcoming Events Section */}
            {hasUpcomingEvents && (
              <section
                aria-labelledby="upcoming-events-heading"
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2
                    id="upcoming-events-heading"
                    className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                  >
                    Upcoming Events
                  </h2>
                  <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    Join us for these exciting upcoming events and opportunities
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...events]
                    .filter((event) => event.type === "Upcoming")
                    .sort((a, b) => {
                      const dateDiff = new Date(b.date) - new Date(a.date);
                      if (dateDiff !== 0) return dateDiff;
                      return b._id.localeCompare(a._id);
                    })
                    .map((event) => (
                      <EventCard key={event._id} event={event} />
                    ))}
                </div>
              </section>
            )}

            {/* Past Events Section */}
            {hasPastEvents && (
              <section aria-labelledby="past-events-heading" className="mt-8">
                <div className="text-center mb-12">
                  <h2
                    id="past-events-heading"
                    className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                  >
                    Past Events
                  </h2>
                  <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    Relive the memories from our previous successful events
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...events]
                    .filter((event) => event.type === "Past")
                    .sort((a, b) => {
                      const dateDiff = new Date(b.date) - new Date(a.date);
                      if (dateDiff !== 0) return dateDiff;
                      return b._id.localeCompare(a._id);
                    })
                    .map((event) => (
                      <EventCard key={event._id} event={event} />
                    ))}
                </div>
              </section>
            )}

            {/* Empty state */}
            {!hasUpcomingEvents && !hasPastEvents && (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-medium text-gray-700 mb-4">
                  No events scheduled at the moment
                </h2>
                <p className="text-gray-500">
                  Please check back later for upcoming events
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default EventsPage;
