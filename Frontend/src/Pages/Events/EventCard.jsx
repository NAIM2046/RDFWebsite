import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  // Format date for better display and SEO
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <article
      className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl h-full flex flex-col"
      itemScope
      itemType="https://schema.org/Event"
    >
      {/* Event Image with lazy loading */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={event.images[0]}
          alt={`${event.title} event cover`}
          className="w-full h-full object-cover"
          loading="lazy"
          itemProp="image"
        />
        {event.type === "Past" && (
          <span className="absolute top-3 right-3 bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Past Event
          </span>
        )}
      </div>

      {/* Event Details */}
      <div className="p-5 flex-1 flex flex-col">
        <h2 className="text-xl font-bold text-gray-800 mb-2" itemProp="name">
          {event.title}
        </h2>

        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2"
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
            <time dateTime={event.date} itemProp="startDate">
              {formatDate(event.date)} {event.time && `at ${event.time}`}
            </time>
          </div>

          {event.location && (
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
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
              <span itemProp="location">{event.location}</span>
            </div>
          )}
        </div>

        {/* Short description would be good here if available */}
        {event.shortDescription && (
          <p
            className="mt-3 text-gray-500 text-sm flex-1"
            itemProp="description"
          >
            {event.shortDescription}
          </p>
        )}

        {/* Action Button */}
        <button
          onClick={() =>
            navigate(`/event-details/${event._id}`, { state: { event } })
          }
          aria-label={`View details about ${event.title}`}
          className={`mt-4 w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${
            event.type === "Upcoming"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-500 hover:bg-gray-600 text-white"
          }`}
        >
          View Details
        </button>
      </div>
    </article>
  );
};

export default EventCard;
