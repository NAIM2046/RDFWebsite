import { useState } from "react";

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
    link: "",
  },
  {
    name: "DAM",
    logo: "dam-logo.png",
    fullName: "Dhaka Ahsania Mission",
    category: "Current Partners",
    link: "",
  },
  {
    name: "DSK",
    logo: "dsk-logo.png",
    fullName: "Dushtha Shasthya Kendra",
    category: "Current Partners",
    link: "",
  },
  {
    name: "ESDO",
    logo: "esdo-logo.png",
    fullName: "Eco-Social Development Organization",
    category: "Current Partners",
    link: "",
  },
  {
    name: "GRAUS",
    logo: "graus-logo.png",
    fullName: "Gram Unnayan Sangathon",
    category: "Current Partners",
    link: "",
  },
  {
    name: "Mukto Akash Bangladesh",
    logo: "mukto-akash-logo.png",
    fullName: "Mukto Akash Bangladesh Foundation",
    category: "Current Partners",
    link: "",
  },
  {
    name: "Plan International",
    logo: "plan-international-logo.png",
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
    <div className="p-6 bg-orange-50 min-h-screen mt-20">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        OUR PARTNERS & DONORS
      </h2>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mt-2">
        Our partnerships are one of our key approaches and an essential part of
        how we achieve success.
      </p>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mt-6">
        {Array.from(
          new Set(partnersData.map((partner) => partner.category))
        ).map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
              activeTab === category
                ? "bg-orange-500 text-white scale-105"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Partner Logos */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
        {partnersData
          .filter((partner) => partner.category === activeTab)
          .map((partner) => (
            <a
              key={partner.name}
              href={partner.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 border border-gray-300 rounded-lg flex justify-center items-center relative group overflow-hidden transition-all duration-300 transform hover:scale-110"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-28 h-28 transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-orange-400 bg-opacity-75 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-2 text-center">
                {partner.fullName || partner.name}
              </div>
            </a>
          ))}
      </div>
    </div>
  );
};
export default OurPartners;
