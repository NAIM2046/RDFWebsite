import React, { useState } from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import coverimg from "/assets/team.jpg";

const teamMembers = [
  {
    name: "Md. Fazlul Karim Patwary",
    post: "Professor",
    image: "/assets/member1.jpg",
    research: "Big Data, Data Science, Machine Learning, Statistical Modeling",
  },
  {
    name: "Dr. M. Mesbahuddin Sarker",
    post: "Professor",
    image: "/assets/member2.jpeg",
    research: "Database, AI, IoT, Media and Communication, Digitization",
  },
  {
    name: "Dr. M. Shamim Kaiser",
    post: "Professor",
    image: "/assets/member3.jpg",
    research:
      "Data analytics, Machine Learning, Health informatics, Wireless Communication",
  },
  {
    name: "Mohammad Abu Yousuf, PhD",
    post: "Lecturer",
    image: "/assets/member4.jpg",
    research:
      "Medical Image Processing, Human-Robot Interaction, Machine Learning",
  },
];

const fallbackImage = "/assets/default-image.jpg"; // Fallback image path

const OurTeam = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [designation, setDesignation] = useState("");

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearchTerm =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.research.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDesignation = designation ? member.post === designation : true;

    return matchesSearchTerm && matchesDesignation;
  });

  return (
    <div>
      <PageCoverPhoto
        title="Our Team"
        subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
        imageUrl={coverimg}
      />
      <div className="container mx-auto p-6">
        {/* Filter Section */}
        <div className="flex flex-wrap gap-4 mb-6 items-center justify-center">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-center w-full">
            <input
              type="text"
              placeholder="Search by Name or Research Interest"
              className="p-2 border rounded-lg w-full sm:w-80"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="p-2 border rounded-lg w-full sm:w-auto"
              onChange={(e) => setDesignation(e.target.value)}
            >
              <option value="">All Designations</option>
              <option value="Professor">Professor</option>
              <option value="Lecturer">Lecturer</option>
            </select>
            <button
              className="bg-blue-600 text-white p-2 pl-3 pr-3 cursor-pointer rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={() => {
                // Optional: Add functionality for button click, if needed
              }}
            >
              Search
            </button>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 text-center justify-items-center border border-gray-300"
            >
              <img
                src={member.image || fallbackImage}
                alt={member.name || "Team Member"}
                className="w-60 h-60 object-cover rounded-lg mb-4 shadow-lg"
              />
              <h3 className="text-xl font-bold text-blue-600">{member.name}</h3>
              <p className="text-gray-700 font-semibold">{member.post}</p>
              <p className="text-sm text-gray-500 mt-2">{member.research}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
