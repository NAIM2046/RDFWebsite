import React from "react";
import EventCard from "./EventCard";

const EventsPage = () => {
  const events = [
    {
      id: 1,
      title: "Climate Change Awareness Campaign",
      date: "March 10, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Dhaka, Bangladesh",

      description:
        "The Climate Change Awareness Campaign is a key event aimed at raising public awareness about the critical issues surrounding climate change and environmental sustainability. Scheduled for March 10, 2025, from 10:00 AM to 2:00 PM, this event will be held in Dhaka, Bangladesh, a city that has been significantly impacted by environmental changes. The event will focus on educating attendees about the causes and consequences of climate change, while offering practical advice on how individuals and communities can adopt eco-friendly practices. The primary goal is to encourage sustainability, reduce carbon footprints, and promote the conservation of natural resources. A wide range of interactive sessions, presentations by environmental experts, and hands-on activities will be featured throughout the day. Participants will gain a deeper understanding of how climate change affects not only the global ecosystem but also their local environment. The campaign will also highlight the importance of adopting green technologies, renewable energy sources, and sustainable practices in everyday life. To make this event engaging and memorable, attendees will have the opportunity to view a series of impactful visual displays and multimedia presentations. The event’s key images will be shared online, including images from the event venue, highlighting the efforts made to raise awareness. Participants will be encouraged to share their personal experiences and thoughts on climate action. The campaign is open to everyone, including students, professionals, environmental advocates, and members of the general public who are concerned about climate change and sustainability. As a vital event for eco-conscious citizens, this campaign seeks to inspire lasting changes in both behavior and policy, ultimately contributing to the fight against global climate change.",
      image: "/assets/RDF Photo/IMG_20190917_160446.jpg",
      type: "Upcoming",
    },
    {
      id: 2,
      title: "Education for All Conference",
      date: "February 25, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Jahangirnagar University",
      description:
        "An annual conference focusing on equal education opportunities.",
      image: "/assets/RDF Photo/CEMB (3).JPG",
      type: "Upcoming",
    },
    {
      id: 3,
      title: "Health & Nutrition Workshop",
      date: "January 15, 2025",
      time: "11:00 AM - 3:00 PM",
      location: "Sylhet, Bangladesh",
      description: "A community-based workshop on health and nutrition.",
      image: "/assets/RDF Photo/GGE (7).jpg",
      type: "Past",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        🌍 Our Events
      </h1>

      {/* Upcoming Events Section */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        🎉 Upcoming Events
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {events
          .filter((event) => event.type === "Upcoming")
          .map((event) => (
            <EventCard key={event.id} event={event} />
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
            <EventCard key={event.id} event={event} />
          ))}
      </div>
    </div>
  );
};

export default EventsPage;
