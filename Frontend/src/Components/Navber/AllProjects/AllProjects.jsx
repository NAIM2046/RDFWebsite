import React, { useEffect, useRef, useState } from "react";
import PageCoverPhoto from "../PageCoverPhoto/PageCoverPhoto";
import coverimg from "/assets/allprojectcover.jpg";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";

const AllProjects = () => {
  const [selected, setSelected] = useState("");
  const [selectedtitle, setSelectedtitle] = useState("ALL");
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
    {
      id: "food-security",
      title: "Food Security, Livelihood, Skills and Economic Empowerment",
    },
    {
      id: "climate-resilience",
      title: "Resilience to Climate Change & Disaster Risk Reduction",
    },
    { id: "emergency-response", title: "Emergency Response" },
    {
      id: "child-rights",
      title:
        "Child Rights, Ending Child Marriage, Education, Health, Nutrition, and Sexual and Reproductive Health Rights (SRHR)",
    },
    {
      id: "cross-cutting",
      title:
        "Cross-cutting Programme: Gender Transformation, Disability Inclusion, and Locally-led Initiatives",
    },
    {
      id: "wash",
      title: "Water, Sanitation, and Hygiene (WASH)",
    },
  ];

  const projects = [
    {
      id: 1,
      name: "Women Development through Agro-based Activities",
      programName: "wash",
      donor: "Women Development Organization",
      budget: "10,000,000 BDT",
      startDate: "2024-01-01",
      endDate: "2025-12-31",
      projectState: "current",
      implementingAreas: "Various Districts & Upazilas",
      directBeneficiaries: { male: 5000, female: 7000 },
      indirectBeneficiaries: { male: 20000, female: 25000 },
      projectGoal: "Improve women's livelihood through agro-based activities",
      majorInterventions: [
        "Microcredit support",
        "Skill development training",
        "Organic farming workshops",
      ],
      projectResults: "Increased income for rural women and food security",
      projectCompletionReport: "Final report submitted to donor",
      remarks: "Ongoing project with positive impact",
      coverImage: "./../../../../public/assets/rdfphoto1/DSC03119.JPG",
      images: ["/assets/project1_1.jpg", "/assets/project1_2.jpg"],
      video: "https://www.youtube.com/watch?v=example1",
    },
    {
      id: 2,
      name: "Education for All Initiative",
      programName: "cross-cutting",
      donor: "Global Education Fund",
      budget: "15,000,000 BDT",
      startDate: "2023-06-01",
      endDate: "2024-12-31",
      projectState: "current",
      implementingAreas: "Dhaka, Chittagong, Sylhet",
      directBeneficiaries: { male: 8000, female: 9500 },
      indirectBeneficiaries: { male: 30000, female: 35000 },
      projectGoal: "Increase literacy rates in underserved communities",
      majorInterventions: [
        "Free textbooks",
        "Teacher training",
        "Mobile libraries",
      ],
      projectResults: "Higher enrollment and literacy improvement",
      projectCompletionReport: "Report in progress",
      remarks: "Well-received by communities",
      coverImage: "./../../../../public/assets/rdfphoto1/DSC03002.JPG",
      images: ["/assets/project2_1.jpg", "/assets/project2_2.jpg"],
      video: "https://www.youtube.com/watch?v=example2",
    },
    {
      id: 3,
      name: "Clean Water Access Project",
      programName: "child-rights",
      donor: "World Health Organization",
      budget: "8,000,000 BDT",
      startDate: "2022-04-01",
      endDate: "2023-10-30",
      projectState: "ended",
      implementingAreas: "Barisal, Khulna",
      directBeneficiaries: { male: 3000, female: 4000 },
      indirectBeneficiaries: { male: 10000, female: 12000 },
      projectGoal: "Provide clean drinking water to rural villages",
      majorInterventions: [
        "Water filtration units",
        "Community awareness programs",
      ],
      projectResults: "Improved public health and reduced diseases",
      projectCompletionReport: "Final report submitted",
      remarks: "Successfully completed",
      coverImage: "./../../../../public/assets/rdfphoto1/DSC03017.JPG",
      images: ["/assets/project3_1.jpg", "/assets/project3_2.jpg"],
      video: "https://www.youtube.com/watch?v=example3",
    },
    {
      id: 4,
      name: "Renewable Energy for Villages",
      programName: "emergency-response",
      donor: "UNDP",
      budget: "12,000,000 BDT",
      startDate: "2023-02-15",
      endDate: "2025-07-20",
      projectState: "current",
      implementingAreas: "Rangpur, Bogura",
      directBeneficiaries: { male: 4500, female: 5500 },
      indirectBeneficiaries: { male: 18000, female: 22000 },
      projectGoal: "Promote solar and wind energy solutions",
      majorInterventions: [
        "Solar panel installation",
        "Energy awareness training",
      ],
      projectResults: "Reduced dependency on fossil fuels",
      projectCompletionReport: "Ongoing project",
      remarks: "Gaining traction",
      coverImage: "/assets/rdfphoto1/DSC03050.JPG",
      images: ["/assets/project4_1.jpg", "/assets/project4_2.jpg"],
      video: "https://www.youtube.com/watch?v=example4",
    },
    {
      id: 5,
      name: "Healthcare for Mothers & Children",
      programName: "food-security",
      donor: "UNICEF",
      budget: "20,000,000 BDT",
      startDate: "2021-09-01",
      endDate: "2023-12-31",
      projectState: "ended",
      implementingAreas: "Cox’s Bazar, Rajshahi",
      directBeneficiaries: { male: 2500, female: 4500 },
      indirectBeneficiaries: { male: 11000, female: 15000 },
      projectGoal: "Reduce maternal and infant mortality rates",
      majorInterventions: ["Vaccination programs", "Free medical checkups"],
      projectResults: "Significant reduction in mortality",
      projectCompletionReport: "Report submitted",
      remarks: "Impactful project",
      coverImage: "/assets/rdfphoto2/IMG_20201231_111258.jpg",
      images: ["/assets/project5_1.jpg", "/assets/project5_2.jpg"],
      video: "https://www.youtube.com/watch?v=example5",
    },
    {
      id: 6,
      name: "Forest Restoration Program",
      programName: "climate-resilience",
      donor: "Green Earth Fund",
      budget: "18,500,000 BDT",
      startDate: "2023-05-01",
      endDate: "2026-06-30",
      projectState: "current",
      implementingAreas: "Sundarbans, Sylhet",
      directBeneficiaries: { male: 6000, female: 5000 },
      indirectBeneficiaries: { male: 20000, female: 24000 },
      projectGoal: "Reforestation and wildlife conservation",
      majorInterventions: ["Tree planting drives", "Eco-tourism promotion"],
      projectResults: "Improved forest density",
      projectCompletionReport: "Mid-term evaluation ongoing",
      remarks: "Critical for biodiversity",
      coverImage: "/assets/rdfphoto2/IMG_20210308_181619.jpg",
      images: ["/assets/project6_1.jpg", "/assets/project6_2.jpg"],
      video: "https://www.youtube.com/watch?v=example6",
    },
    {
      id: 7,
      name: "Youth Digital Skills Training",
      programName: "wash",
      donor: "Tech Innovation Fund",
      budget: "9,500,000 BDT",
      startDate: "2024-03-01",
      endDate: "2025-12-31",
      projectState: "current",
      implementingAreas: "Dhaka, Comilla",
      directBeneficiaries: { male: 4000, female: 5000 },
      indirectBeneficiaries: { male: 15000, female: 18000 },
      projectGoal: "Equip youth with digital skills for employment",
      majorInterventions: ["Coding bootcamps", "Freelancing workshops"],
      projectResults: "Higher employment rates",
      projectCompletionReport: "In progress",
      remarks: "Popular among students",
      coverImage: "/assets/cover7.jpg",
      images: ["/assets/project7_1.jpg", "/assets/project7_2.jpg"],
      video: "https://www.youtube.com/watch?v=example7",
    },
  ];
  const handleTabClick = (program) => {
    setSelected(program.id);
    setSelectedtitle(program.title);
  };
  const filteredProjects = selected
    ? projects.filter(
        (project) =>
          project.programName.replace(/-/g, "_") === selected.replace(/-/g, "_")
      )
    : projects;

  return (
    <div className="mb-12">
      <PageCoverPhoto
        title="All Projects"
        subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
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
          className="flex space-x-2 overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar w-full px-4 sm:px-6 md:px-12 py-2 font-serif mt-10"
          onScroll={checkScrollButtons} // Detect scrolling
        >
          {programs.map((program) => (
            <div
              key={program.id}
              className={`px-2 py-2 pt-4 pb-4 text-[14px] font-medium rounded-lg transition-all cursor-pointer text-center  min-w-[150px] sm:min-w-[160px] md:min-w-[180px] 
      ${
        selected === program.id
          ? "bg-green-400 text-black"
          : "bg-white border border-red-500 hover:border-amber-300 text-gray-700"
      }`}
              onClick={() => handleTabClick(program)}
              title={program.title} // Tooltip for full title
            >
              <span className="block text-sm leading-tight line-clamp-2 overflow-hidden text-ellipsis">
                {program.title}
              </span>
            </div>
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
      <div>
        <h1 className="text-center text-xl font-serif pt-2 pb-2">
          {selectedtitle}
        </h1>
        <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-serif">
          {filteredProjects.map((project) => (
            <div className="bg-white rounded-lg shadow-md shadow-gray-400 hover:shadow-lg hover:shadow-black transition flex flex-col h-full">
              {/* Project Image */}
              <img
                src={project.coverImage}
                alt={project.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />

              {/* Project Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold">{project.name}</h3>

                <p className="text-sm text-gray-600">
                  <strong>Donor:</strong> {project.donor}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Duration:</strong> {project.startDate} {"to "}{" "}
                  {project.endDate}
                </p>

                {/* Button Always at Bottom */}
                <button
                  onClick={() => navigate(`/project-details`)}
                  className="inline-flex items-center px-3 py-2 mt-auto text-sm font-medium rounded-lg btn btn-outline btn-primary focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  View Details
                  <FaArrowRight className="p-1 text-2xl pl-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
