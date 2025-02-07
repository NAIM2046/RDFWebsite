import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Using Lucide icons
import { useNavigate } from "react-router-dom";
const programs = [
  {
    id: "health",
    title: "Health and Nutrition",
    description:
      "At RDF, health is a fundamental human right, and a critical factor for reducing poverty, gender inequality, and marginalization.",
    projects: [
      "Comprehensive prevention programs for people who inject drugs (PWID) and their partners",
      "JANO - Joint Action for Nutrition Outcome",
      "USAID’S COMMUNITY NUTRITION AND HEALTH ACTIVITY (CNHA)",
    ],
    image: "/assets/Girls-Economic-Empowerment-min.png",
  },
  {
    id: "women",
    title: "Women and Youth Empowerment",
    description:
      "Empowering women and youth to build a more sustainable and equitable society.",
    projects: ["Leadership training", "Vocational education programs"],
    image: "/assets/images-2-1.png",
  },
  {
    id: "climate",
    title: "Humanitarian and Climate Action",
    description:
      "Supporting climate resilience and humanitarian responses to protect vulnerable communities.",
    projects: ["Disaster response programs", "Climate adaptation initiatives"],
    image: "/assets/Karate-Training-min.png",
  },
  {
    id: "agriculture",
    title: "Food and Agricultural Systems",
    description:
      "Improving agricultural sustainability and food security for communities worldwide.",
    projects: ["Sustainable farming", "Food security initiatives"],
    image: "/assets/DSC03104.webp",
  },
];

const OurProgram = () => {
  const [selected, setSelected] = useState("health");
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const tabRef = useRef(null);
  const navigate = useNavigate();

  // Function to check if scrolling is needed
  const checkScrollButtons = () => {
    if (tabRef.current) {
      setShowLeft(tabRef.current.scrollLeft > 0);
      setShowRight(
        tabRef.current.scrollLeft <
          tabRef.current.scrollWidth - tabRef.current.clientWidth
      );
    }
  };

  // Scroll the tabs and update button visibility
  const scrollTabs = (direction) => {
    if (tabRef.current) {
      tabRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
      setTimeout(checkScrollButtons, 300); // Delay to allow smooth scrolling
    }
  };

  // Run the check when component mounts and when resizing occurs
  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">OUR PROGRAMS</h2>

      {/* Scrollable Tabs with Navigation Buttons */}
      <div className="relative flex items-center">
        {/* Left Button (only visible when needed) */}
        {showLeft && (
          <button
            onClick={() => scrollTabs("left")}
            className="absolute left-0 z-10 p-2 bg-white shadow-md rounded-full flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Scrollable Tabs */}
        <div
          ref={tabRef}
          className="flex space-x-2 overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar w-full px-12 py-2"
          onScroll={checkScrollButtons} // Detect scrolling
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

        {/* Right Button (only visible when needed) */}
        {showRight && (
          <button
            onClick={() => scrollTabs("right")}
            className="absolute right-0 z-10 p-2 bg-white shadow-md rounded-full flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}
      </div>

      {/* Program Details */}
      {programs.map(
        (program) =>
          selected === program.id && (
            <div
              key={program.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-6"
            >
              <img
                src={program.image}
                alt={program.title}
                className="w-full rounded-lg shadow-lg"
                loading="lazy"
              />
              <div>
                <h3 className="text-2xl font-bold text-orange-600">
                  {program.title}
                </h3>
                <p className="mt-3 text-gray-600">{program.description}</p>

                {/* Projects List */}
                <h4 className="mt-6 text-lg font-semibold text-gray-800">
                  Projects under this program:
                </h4>
                <ul className="mt-3 list-disc">
                  {program.projects.map((project, index) => (
                    <li
                      key={index}
                      className="text-gray-700 border-b border-gray-300 pb-1 mb-2 cursor-pointer hover:text-orange-400"
                    >
                      {project}
                    </li>
                  ))}
                </ul>

                {/* Buttons */}
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() =>
                      navigate("/program-details", { state: { program } })
                    }
                    className="bg-orange-500 text-white px-5 py-2 rounded-lg shadow-md transition hover:bg-orange-600 cursor-pointer"
                  >
                    Read More
                  </button>
                  <button
                    onClick={() => navigate("/all-projects")}
                    className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg shadow-md transition hover:bg-gray-300 cursor-pointer"
                  >
                    See All Projects
                  </button>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default OurProgram;
