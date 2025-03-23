import React, { useEffect } from "react";
import EventCard from "./EventCard";
import useRDFStore from "../../storage/useRDFstorage";
import { Helmet } from "react-helmet-async";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";

const EventsPage = () => {
  const { events, fetchEvent } = useRDFStore();

  useEffect(() => {
    if (events.length === 0) {
      fetchEvent();
    }
  }, []);

  return (
    <div>
      <PageCoverPhoto title={"Our Events"}></PageCoverPhoto>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <Helmet>
          <title> RDF-Events </title>
        </Helmet>
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          Our Events
        </h1>

        {/* Upcoming Events Section */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          🎉 Upcoming Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {events
            .filter((event) => event.type === "Upcoming")
            .map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
        </div>

        {/* Past Events Section */}
        <h2 className="text-2xl font-semibold mt-12 mb-6 text-gray-800 text-center">
          📌 Past Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events
            .filter((event) => event.type === "Past")
            .map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
