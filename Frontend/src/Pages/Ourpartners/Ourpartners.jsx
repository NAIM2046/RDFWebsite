import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import useRDFStore from "../../storage/useRDFstorage";
import { Helmet } from "react-helmet-async";

const OurPartners = () => {
  const [activeTab, setActiveTab] = useState("All");
  const { partners, fetchPartner } = useRDFStore();

  useEffect(() => {
    fetchPartner();
  }, []);

  const categories = [
    "All",
    ...new Set(partners.map((partner) => partner.category)),
  ];

  return (
    <motion.div
      className="bg-gray-50 min-h-screen pb-10 font-serif"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Helmet>
        <title> RDF-Partners </title>
      </Helmet>
      <PageCoverPhoto title={" PARTNERS & DONORS"} />
      <motion.div
        className="mt-10 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          OUR PARTNERS & DONORS
        </h2>
        {/* <p className="text-center text-green-400 max-w-3xl mx-auto mt-2">
          Our partnerships are one of our key approaches and an essential part
          of how we achieve success.
        </p> */}

        {/* Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* {categories.map((category) => (
            <button
              key={category}
              className={`px-5 py-3 rounded-lg cursor-pointer shadow-md text-md font-semibold transition-all duration-300 
                ${
                  activeTab === category
                    ? "bg-red-500 text-white scale-105"
                    : "bg-green-400 text-gray-950 hover:bg-gray-300"
                }`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))} */}
        </motion.div>

        {/* Partner Logos */}
        <div className="flex justify-center mt-6 mx-auto max-w-6xl">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl w-full px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {partners
              .filter(
                (partner) =>
                  activeTab === "All" || partner.category === activeTab
              )
              .map((partner) => (
                <motion.a
                  key={partner.name}
                  href={partner.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-4 border border-green-400 hover:border-gray-300 rounded-lg shadow-2xl flex justify-center items-center relative group overflow-hidden transition-all duration-300 hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 transition-transform duration-300 group-hover:scale-110 object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-green-600 bg-opacity-80 text-white text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-2 text-center">
                    {partner.fullName || partner.name}
                  </div>
                </motion.a>
              ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OurPartners;
