import React, { useEffect, useRef, useState } from "react";
import PageCoverPhoto from "../PageCoverPhoto/PageCoverPhoto";
import coverimg from "/assets/allprojectcover.jpg";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";

const AllProjects = () => {
  const [selected, setSelected] = useState("");
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const tabRef = useRef(null);
  const navigate = useNavigate();

  const checkScrollButtons = () => {
    if (tabRef.current) {
      setShowLeft(tabRef.current.scrollLeft > 0);
      setShowRight(
        tabRef.current.scrollLeft <
          tabRef.current.scrollWidth - tabRef.current.clientWidth
      );
    }
  };

  const scrollTabs = (direction) => {
    if (tabRef.current) {
      tabRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);

  const programs = [
    { id: "", title: "ALL" },
    { id: "health", title: "Health and Nutrition" },
    { id: "women", title: "Women and Youth Empowerment" },
    { id: "climate", title: "Humanitarian and Climate Action" },
    { id: "agriculture", title: "Food and Agricultural Systems" },
  ];

  const projects = [
    {
      id: 1,
      category: "health",
      title: "Community Health Initiative",
      duration: "April 2021 - Dec 2023",
      donor: "USAID",
      image: "/assets/photo-40.1-400x284.png",
    },
    {
      id: 2,
      category: "health",
      title: "Nutrition for Kids",
      duration: "Jan 2022 - Nov 2024",
      donor: "WHO",
      image: "/assets/photo-36-400x284.jpg",
    },
    {
      id: 3,
      category: "women",
      title: "Empowering Young Women",
      duration: "Mar 2021 - Dec 2023",
      donor: "UN Women",
      image: "/assets/women1.jpg",
    },
    {
      id: 4,
      category: "women",
      title: "Skills for Women",
      duration: "Feb 2020 - Sep 2024",
      donor: "World Bank",
      image: "/assets/women2.jpg",
    },
    {
      id: 5,
      category: "climate",
      title: "Climate Action Now",
      duration: "June 2021 - Dec 2023",
      donor: "UNDP",
      image: "/assets/climate1.jpg",
    },
    {
      id: 6,
      category: "climate",
      title: "Renewable Energy Drive",
      duration: "May 2022 - Aug 2025",
      donor: "Green Peace",
      image: "/assets/climate2.jpg",
    },
    {
      id: 7,
      category: "agriculture",
      title: "Smart Farming",
      duration: "July 2020 - Oct 2024",
      donor: "FAO",
      image: "/assets/agriculture1.jpg",
    },
    {
      id: 8,
      category: "agriculture",
      title: "Organic Food Growth",
      duration: "Apr 2021 - Dec 2024",
      donor: "Gates Foundation",
      image: "/assets/agriculture2.jpg",
    },
    {
      id: 9,
      category: "health",
      title: "Maternal Health Support",
      duration: "Jan 2023 - Dec 2025",
      donor: "Red Cross",
      image: "./../../../../public/assets/photo-120-400x284.jpg",
    },
    {
      id: 10,
      category: "women",
      title: "Women in Tech",
      duration: "Mar 2022 - Aug 2026",
      donor: "Microsoft",
      image: "/assets/women3.jpg",
    },
  ];

  const filteredProjects = selected
    ? projects.filter((project) => project.category === selected)
    : projects;

  return (
    <div className="mb-12">
      <PageCoverPhoto
        title="All Projects"
        subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
        imageUrl={coverimg}
      />

      {/* Scrollable Tab Navigation */}
      <div className="relative flex items-center">
        {showLeft && (
          <button
            onClick={() => scrollTabs("left")}
            className="absolute left-0 z-10 p-2 bg-white shadow-md rounded-full flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}

        <div
          ref={tabRef}
          className="flex justify-center space-x-2 overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar w-full px-12 py-2"
          onScroll={checkScrollButtons}
        >
          {programs.map((program) => (
            <button
              key={program.id}
              className={`px-4 py-2 text-[15px] font-medium rounded-lg transition-all w-auto h-20 cursor-pointer
              ${
                selected === program.id
                  ? "bg-orange-500 text-white"
                  : "bg-white border hover:border-amber-300 text-gray-700"
              }`}
              onClick={() => setSelected(program.id)}
            >
              {program.title}
            </button>
          ))}
        </div>

        {showRight && (
          <button
            onClick={() => scrollTabs("right")}
            className="absolute right-0 z-10 p-2 bg-white shadow-md rounded-full flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}
      </div>

      {/* Project Cards Section */}
      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md  border hover:shadow-lg transition"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-44 object-cover rounded-lg rounded-b-none"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mt-4">{project.title}</h3>
              <p className="text-sm text-gray-600">
                <strong>Duration:</strong> {project.duration}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Donor:</strong> {project.donor}
              </p>
              <button
                onClick={() => navigate("/project-details")}
                className="inline-flex items-center px-3 py-2 mt-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
              >
                View Details
                <FaArrowRight className="p-1 text-2xl pl-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
