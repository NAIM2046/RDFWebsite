import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useRDFStore from "../../../storage/useRDFstorage";

const OurPartners = () => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 6 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 4 },
    smallTablet: { breakpoint: { max: 768, min: 480 }, items: 3 },
    mobile: { breakpoint: { max: 480, min: 0 }, items: 2 },
  };

  const { partners, fetchPartner } = useRDFStore();

  useEffect(() => {
    if (partners.length === 0) {
      fetchPartner();
    }
  }, [partners, fetchPartner]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full py-16 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
            Our Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We collaborate with leading organizations worldwide to create
            meaningful impact
          </p>
        </motion.div>

        {/* Partners Carousel */}
        {partners.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
              <p className="text-gray-600">Loading our partners...</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="transform 600ms ease-in-out"
              transitionDuration={600}
              removeArrowOnDeviceType={["tablet", "mobile"]}
              containerClass="carousel-container"
              dotListClass="custom-dot-list"
              itemClass="px-4 flex justify-center"
              arrows={true}
              renderButtonGroupOutside={true}
            >
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2 py-4"
                >
                  <a
                    href={partner.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full p-6 flex items-center justify-center border border-gray-100"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.alt || partner.name}
                      className="max-h-24 max-w-full object-contain filter  transition-all duration-500"
                      style={{ height: "80px", width: "auto" }}
                    />
                  </a>
                </motion.div>
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default OurPartners;
