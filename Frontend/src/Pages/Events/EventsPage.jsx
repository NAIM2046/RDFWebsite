import React, { useEffect } from "react";
import EventCard from "./EventCard";
import useRDFStore from "../../storage/useRDFstorage";
import { Helmet } from "react-helmet-async";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import { useLocation } from "react-router-dom";

const EventsPage = () => {
  const { events, fetchEvent } = useRDFStore();
  const location = useLocation();
  const canonicalUrl = `https://yourdomain.com${location.pathname}`;

  useEffect(() => {
    if (events.length === 0) {
      fetchEvent();
    }
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
          eventStatus: "EventMovedOnline", // or "EventCancelled", "EventPostponed" as appropriate
        })),
      ],
    };
  };

  const hasUpcomingEvents = events.some((event) => event.type === "Upcoming");
  const hasPastEvents = events.some((event) => event.type === "Past");
  const pageDescription = hasUpcomingEvents
    ? "Discover upcoming events and relive past events from RDF. Join our community for exciting opportunities."
    : "Explore past events from RDF and stay tuned for future opportunities.";

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

      <PageCoverPhoto
        title="Our Events"
        description="Join our community through these meaningful events"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="sr-only">RDF Events</h1>

        {/* Upcoming Events Section */}
        {hasUpcomingEvents && (
          <section aria-labelledby="upcoming-events-heading" className="mb-16">
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
              {events
                .filter((event) => event.type === "Upcoming")
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
              {events
                .filter((event) => event.type === "Past")
                .map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {!hasUpcomingEvents && !hasPastEvents && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-medium text-gray-700 mb-4">
              No events scheduled at the moment
            </h2>
            <p className="text-gray-500">
              Please check back later for upcoming events
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default EventsPage;
