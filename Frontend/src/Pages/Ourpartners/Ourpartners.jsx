import { useState } from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";

const partnersData = [
  {
    name: "APOSH",
    logo: "/assets/partner-1.webp",
    fullName: "Association for the Promotion of Social Harmony",
    category: "Current Partners",
    link: "https://aposh.org",
  },
  {
    name: "Jagonari",
    logo: "/assets/RDF Photo/pd-19.jpg",
    fullName: "Jagonari Women's Empowerment Organization",
    category: "Current Partners",
    link: "https://www.savethechildren.net/",
  },
  {
    name: "DAM",
    logo: "assets/RDF Photo/partner1.png",
    fullName: "Dhaka Ahsania Mission",
    category: "Current Partners",
    link: "",
  },
  {
    name: "DSK",
    logo: "assets/RDF Photo/partner2.png",
    fullName: "Dushtha Shasthya Kendra",
    category: "Current Partners",
    link: "",
  },
  {
    name: "ESDO",
    logo: "assets/RDF Photo/partner3.png",
    fullName: "Eco-Social Development Organization",
    category: "Current Partners",
    link: "",
  },
  {
    name: "GRAUS",
    logo: "assets/RDF Photo/partner4.png",
    fullName: "Gram Unnayan Sangathon",
    category: "Current Partners",
    link: "",
  },
  {
    name: "Mukto Akash Bangladesh",
    logo: "assets/RDF Photo/partner5.png",
    fullName: "Mukto Akash Bangladesh Foundation",
    category: "Current Partners",
    link: "",
  },
  {
    name: "Plan International",
    logo: "assets/RDF Photo/partner6.png",
    fullName: "Plan International Bangladesh",
    category: "Current Partners",
    link: "",
  },
  {
    name: "Rupantar",
    logo: "rupantar-logo.png",
    fullName: "Rupantar Social Development Organization",
    category: "Current Partners",
    link: "",
  },
  {
    name: "Save the Children",
    logo: "save-the-children-logo.png",
    fullName: "Save the Children International",
    category: "Current Partners",
    link: "",
  },
  {
    name: "UNICEF",
    logo: "unicef-logo.png",
    fullName: "United Nations International Children's Emergency Fund",
    category: "Donors",
    link: "https://unicef.org",
  },
  {
    name: "WHO",
    logo: "who-logo.png",
    fullName: "World Health Organization",
    category: "Donors",
    link: "https://who.int",
  },
  {
    name: "World Bank",
    logo: "world-bank-logo.png",
    fullName: "The World Bank Group",
    category: "Donors",
    link: "https://worldbank.org",
  },
  {
    name: "BRAC",
    logo: "brac-logo.png",
    fullName: "Building Resources Across Communities",
    category: "Strategic Partners",
    link: "https://brac.net",
  },
  {
    name: "Care Bangladesh",
    logo: "care-bangladesh-logo.png",
    fullName: "Care Bangladesh Humanitarian Organization",
    category: "Strategic Partners",
    link: "",
  },
  {
    name: "Oxfam",
    logo: "oxfam-logo.png",
    fullName: "Oxfam International",
    category: "Strategic Partners",
    link: "https://oxfam.org",
  },
  {
    name: "Ministry of Education",
    logo: "ministry-education-logo.png",
    fullName: "Ministry of Education, Bangladesh",
    category: "Govt. Ministries",
    link: "",
  },
  {
    name: "Ministry of Health",
    logo: "ministry-health-logo.png",
    fullName: "Ministry of Health and Family Welfare",
    category: "Govt. Ministries",
    link: "",
  },
  {
    name: "Ministry of Social Welfare",
    logo: "ministry-social-welfare-logo.png",
    fullName: "Ministry of Social Welfare, Bangladesh",
    category: "Govt. Ministries",
    link: "",
  },
];

const OurPartners = () => {
  const [activeTab, setActiveTab] = useState("Current Partners");

  return (
    <div className=" bg-gray-100 min-h-screen pb-10 font-serif">
      <PageCoverPhoto title={"OUR PARTNERS"}></PageCoverPhoto>
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          OUR PARTNERS & DONORS
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mt-2">
          Our partnerships are one of our key approaches and an essential part
          of how we achieve success.
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mt-6">
          {Array.from(
            new Set(partnersData.map((partner) => partner.category))
          ).map((category) => (
            <button
              key={category}
              className={`px-5 py-4  rounded-xl cursor-pointer shadow-lg  text-md font-semibold transition-all duration-300 ${
                activeTab === category
                  ? "bg-green-500 text-white scale-105"
                  : "bg-green-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Partner Logos */}
        <div className="flex justify-center ">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6 max-w-7xl w-auto">
            {partnersData
              .filter((partner) => partner.category === activeTab)
              .map((partner) => (
                <a
                  key={partner.name}
                  href={partner.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg flex justify-center items-center relative group overflow-hidden transition-all duration-300 transform hover:scale-110"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-44 h-44 transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-orange-400 bg-opacity-75 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-2 text-center">
                    {partner.fullName || partner.name}
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OurPartners;
