import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useRDFStore from "../../../storage/useRDFstorage";

const OurPartners = () => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 6 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 600 }, items: 3 },
    mobile: { breakpoint: { max: 600, min: 0 }, items: 2 },
  };

  const { partners, fetchPartner } = useRDFStore();

  useEffect(() => {
    if (partners.length === 0) {
      fetchPartner();
    }
  }, [partners, fetchPartner]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full flex flex-col justify-center items-center py-8 bg-gradient-to-br bg-white text-black font-serif"
    >
      {/* Title with Animated Glow */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-4xl text-center font-bold mb-10 text-black drop-shadow-lg transition-transform duration-500 hover:scale-101"
      >
        Our Global Partners
      </motion.h1>

      {partners.length === 0 ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-gray-700"></div>
          <p className="text-lg ml-3">Loading partners...</p>
        </div>
      ) : (
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2500}
          keyBoardControl={true}
          customTransition="transform 0.8s ease-in-out"
          transitionDuration={800}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="px-6"
        >
          {partners.map((partner, index) => (
            <motion.a
              key={index}
              href={partner.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="flex justify-center items-center p-2 group bg-green-50 border border-green-400 w-44 h-44 shadow rounded-md"
            >
              <img
                src={partner.logo}
                alt={partner.alt || partner.name}
                className="mx-auto max-w-44 max-h-44 p-2 object-contain transition-transform duration-300 group-hover:scale-101"
              />
            </motion.a>
          ))}
        </Carousel>
      )}
    </motion.div>
  );
};

export default OurPartners;
