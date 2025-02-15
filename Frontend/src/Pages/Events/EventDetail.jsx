import React from "react";
import { useLocation } from "react-router-dom";
import ShareAndComment from "../../Components/Navber/AllProjects/ShareAndComment";

const EventDetail = () => {
  const location = useLocation();
  const { event } = location.state;
  console.log(event);

  return (
    <div className="mt-24">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Content (Main Event) */}
        <div className="md:col-span-2">
          {/* Event Title */}
          <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>

          {/* Event Date Badge */}
          <div className="inline-block bg-orange-500 text-white px-4 py-1 mt-2 text-sm font-semibold rounded-md">
            {event.date}
          </div>

          {/* Event Time */}
          <div className="mt-2 text-gray-600">
            <strong>Time: </strong>
            {event.time}
          </div>

          {/* Event Location */}
          <div className="mt-2 text-gray-600">
            <strong>Location: </strong>
            {event.location}
          </div>

          {/* Event Image */}
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-96 object-cover rounded-lg shadow-md mt-4"
          />

          {/* Event Description */}
          <p className="mt-6 text-gray-700 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Photo Gallery Section */}
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <img
            src={event.image}
            alt="Photo Gallery"
            className="w-full rounded-lg"
          />
          <h2 className="text-lg font-bold mt-3">Photo Gallery</h2>
          <p className="text-gray-600">
            Check out event highlights and moments.
          </p>
          <button className="mt-3 text-green-600 font-semibold">
            View Media Gallery →
          </button>
        </div>
      </div>
      <ShareAndComment></ShareAndComment>
    </div>
  );
};

export default EventDetail;
