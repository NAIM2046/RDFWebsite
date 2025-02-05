import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import coverimg from "/assets/team.jpg";

const teamMembers = [
  {
    name: "Md. Fazlul Karim Patwary",
    post: "General Committee",
    image: "/assets/member1.jpg",
    bio: "Experienced researcher and academic specializing in data science and statistical modeling.",
    research: "Big Data, Data Science, Machine Learning, Statistical Modeling",
    academic: "PhD in Data Science, University of Dhaka",
    experience: [
      {
        organization: "Jahangirnagar University",
        position: "Professor",
        period: "2010 - Present",
      },
      {
        organization: "ABC Research Institute",
        position: "Senior Researcher",
        period: "2005 - 2010",
      },
    ],
    contact: {
      email: "karim.patwary@example.com",
      phone: "+880 1234 567890",
    },
  },
  {
    name: "Dr. M. Mesbahuddin Sarker",
    post: "Executive Committee",
    image: "/assets/member2.jpeg",
    bio: "AI and database expert with a strong focus on IoT and media digitization.",
    research: "Database, AI, IoT, Media and Communication, Digitization",
    academic: "PhD in Computer Science, BUET",
    experience: [
      {
        organization: "BUET",
        position: "Associate Professor",
        period: "2012 - Present",
      },
      {
        organization: "XYZ Tech",
        position: "Lead AI Researcher",
        period: "2008 - 2012",
      },
    ],
    contact: {
      email: "mesbah.sarker@example.com",
      phone: "+880 1987 654321",
    },
  },
  {
    name: "Dr. M. Shamim Kaiser",
    post: "Senior Management",
    image: "/assets/member3.jpg",
    bio: "Data analytics specialist with expertise in health informatics and wireless communication.",
    research:
      "Data Analytics, Machine Learning, Health Informatics, Wireless Communication",
    academic: "PhD in Information Technology, University of Toronto",
    experience: [
      {
        organization: "Jahangirnagar University",
        position: "Professor",
        period: "2015 - Present",
      },
      {
        organization: "Global HealthTech",
        position: "Data Scientist",
        period: "2010 - 2015",
      },
    ],
    contact: {
      email: "shamim.kaiser@example.com",
      phone: "+880 1765 432109",
    },
  },
  {
    name: "Mohammad Abu Yousuf, PhD",
    post: "Executive Committee",
    image: "/assets/member4.jpg",
    bio: "Passionate about medical image processing and human-robot interaction.",
    research:
      "Medical Image Processing, Human-Robot Interaction, Machine Learning",
    academic: "PhD in Robotics, University of Tokyo",
    experience: [
      {
        organization: "University of Tokyo",
        position: "Postdoctoral Researcher",
        period: "2017 - 2020",
      },
      {
        organization: "Jahangirnagar University",
        position: "Lecturer",
        period: "2020 - Present",
      },
    ],
    contact: {
      email: "yousuf@example.com",
      phone: "+880 1555 678910",
    },
  },
];

const OurTeam = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [designation, setDesignation] = useState("");
  const navigate = useNavigate();

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
              <option value="">All Members</option>
              <option value="General Committee">General Committee</option>
              <option value="Executive Committee">Executive Committee</option>
              <option value="Senior Management">Senior Management</option>
            </select>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 text-center border border-gray-300 justify-items-center "
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-60 h-60 object-cover rounded-lg mb-4 shadow-lg"
              />
              <h3 className="text-xl font-bold text-blue-600">{member.name}</h3>
              <p className="text-gray-700 font-semibold">{member.post}</p>
              <p className="text-sm text-gray-500 mt-2">{member.research}</p>
              {/* View Details Button */}
              <button
                onClick={() =>
                  navigate("/our-team/details", { state: { member } })
                }
                className="btn btn-outline btn-info mt-2"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
