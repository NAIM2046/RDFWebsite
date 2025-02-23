import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Using Lucide icons
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const programs = [
  {
    id: "food-security",
    title: "Food Security, Livelihood, Skills and Economic Empowerment",
    description:
      "Enhancing food security, livelihoods, and economic opportunities through skill development and empowerment initiatives Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui blanditiis, consequatur sunt deserunt magni reprehenderit laborum eius adipisci eveniet inventore animi nihil! Ea, fugit accusantium quod delectus eligendi veritatis repudiandae..",
    projects: [
      "Sustainable farming practices",
      "Vocational training programs",
      "Small business support initiatives",
    ],
    image: "/assets/RDF Photo/CEMB (10).jpg",
  },
  {
    id: "climate-resilience",
    title: "Resilience to Climate Change & Disaster Risk Reduction",
    description:
      "Strengthening communities to adapt to climate change and mitigate disaster risks effectively.",
    projects: [
      "Community-based disaster preparedness",
      "Climate adaptation programs",
      "Sustainable environmental practices",
    ],
    image:
      "/assets/RDF Photo/Girls_ Economic Empowerment- Self Employed Beneficiary (8).JPG",
  },
  {
    id: "emergency-response",
    title: "Emergency Response",
    description:
      "Providing timely assistance and relief to communities affected by natural disasters and humanitarian crises.",
    projects: [
      "Disaster relief operations",
      "Emergency healthcare and shelter",
      "Post-disaster rehabilitation programs",
    ],
    image: "/assets/RDF Photo/20231226_122519(1).jpg",
  },
  {
    id: "child-rights",
    title:
      "Child Rights, Ending Child Marriage, Education, Health, Nutrition, and Sexual and Reproductive Health Rights (SRHR)",
    description:
      "Ensuring children's rights, promoting education, healthcare, and advocating against child marriage.",
    projects: [
      "Child protection and advocacy",
      "Education and literacy programs",
      "Maternal and child health initiatives",
    ],
    image: "/assets/RDF Photo/CEMB.jpeg",
  },
  {
    id: "cross-cutting",
    title:
      "Cross-cutting Programme: Gender Transformation, Disability Inclusion, and Locally-led Initiatives",
    description:
      "Advancing gender equality, disability inclusion, and empowering local communities to lead initiatives.",
    projects: [
      "Gender equality programs",
      "Disability inclusion advocacy",
      "Community-driven development projects",
    ],
    image: "/assets/RDF Photo/IMG_20231015_163140.jpg",
  },
  {
    id: "wash",
    title: "Water, Sanitation, and Hygiene (WASH)",
    description:
      "Improving access to clean water, sanitation, and hygiene to promote better health and well-being.",
    projects: [
      "Safe drinking water initiatives",
      "Community-led sanitation programs",
      "Hygiene education campaigns",
    ],
    image: "/assets/RDF Photo/IMG_5223.JPG",
  },
];

const OurProgram = () => {
  const [selected, setSelected] = useState(programs[0].id);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const tabRef = useRef(null);
  const navigate = useNavigate();
  const autoChangeRef = useRef(null);

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
  useEffect(() => {
    startAutoChange(); // ✅ Fix: Start auto-changing on component mount
    return () => clearInterval(autoChangeRef.current); // ✅ Cleanup on unmount
  }, [selected]);

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
  const startAutoChange = () => {
    clearInterval(autoChangeRef.current);
    autoChangeRef.current = setInterval(() => {
      setSelected((prev) => {
        const currentIndex = programs.findIndex((p) => p.id === prev);
        return programs[(currentIndex + 1) % programs.length].id; // ✅ Loop back after last program
      });
    }, 90000); // ✅ Auto-change every 9 seconds
  };
  const handleTabClick = (id) => {
    setSelected(id);
    startAutoChange(); // Restart timer on manual selection
  };
  return (
    <div className="max-w-8xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 font-serif">
        OUR PROGRAMS
      </h2>

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
          className="flex space-x-2 overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar w-full px-4 sm:px-6 md:px-12 py-2 font-serif"
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
              onClick={() => handleTabClick(program.id)}
              title={program.title} // Tooltip for full title
            >
              <span className="block text-sm leading-tight line-clamp-2 overflow-hidden text-ellipsis">
                {program.title}
              </span>
            </div>
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
      <AnimatePresence mode="wait">
        {programs.map(
          (program) =>
            selected === program.id && (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center mt-6 px-6 py-8 bg-white rounded-lg shadow-md"
              >
                <div className="w-full">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-auto max-h-[400px] rounded-lg shadow-lg object-cover"
                    loading="lazy"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-orange-600 leading-snug font-serif">
                    {program.title}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {program.description}
                  </p>

                  <h4 className="mt-6 text-lg font-semibold text-gray-800">
                    Projects under this program:
                  </h4>
                  <ul className="mt-3 list-disc pl-5 space-y-2">
                    {program.projects.map((project, index) => (
                      <li
                        key={index}
                        className="text-gray-700 border-b border-gray-300 pb-1 mb-2 cursor-pointer hover:text-orange-500 transition"
                      >
                        <a href="/project-details"> {project}</a>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <button
                      onClick={() =>
                        navigate("/program-details", { state: { program } })
                      }
                      className="  px-5 py-2 rounded-lg shadow-md transition  hover:shadow-lg cursor-pointer btn btn-outline btn-primary "
                    >
                      Read More...
                    </button>
                    <button
                      onClick={() => navigate("/all-projects")}
                      className=" btn btn-outline btn-success px-5 py-2 rounded-lg shadow-md transition  hover:shadow-lg"
                    >
                      See All Projects
                    </button>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>
    </div>
  );
};

export default OurProgram;
