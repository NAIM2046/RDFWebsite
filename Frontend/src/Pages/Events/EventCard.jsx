import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white outline-0   rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-101 hover:shadow-2xl">
      {/* Event Image */}
      <img
        src={event.images[0]}
        alt={event.title}
        className="w-full h-48 object-cover"
      />

      {/* Event Details */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
        <p className="text-gray-600 mt-1">
          {event.date} | {event.time}
        </p>
        <p className="text-gray-500">{event.location}</p>

        {/* Action Button */}
        <button
          onClick={() =>
            navigate(`/event-details/${event._id}`, { state: { event } })
          }
          className={`mt-4 cursor-pointer outline-1 outline-green-500 px-5 py-2 w-full text-green-400  btn btn-outline font-semibold rounded-lg 
              ${
                event.type === "Upcoming"
                  ? " hover:bg-blue-700"
                  : " hover:bg-gray-600"
              } transition-colors`}
        >
          {event.type === "Upcoming" ? "Register Now" : "View Details"}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
