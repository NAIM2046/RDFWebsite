import { Carousel, Typography, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import slide1 from "../../../assets/1st-slide.webp"; // Adjust the local image path
import { useNavigate } from "react-router-dom";
import visionIcon from "/assets/vission.jpg";
import missionIcon from "/assets/mission.jpg";
import valueIcon from "/assets/value-1.jpg";
import useRDFStore from "../../../storage/useRDFstorage";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hook/useAxiosPublice";

const Slider = () => {
  const { isLoading, sliderinfo, fetchsliderinfo } = useRDFStore();

  // Fetch slider info and set loading state
  useEffect(() => {
    if (sliderinfo.length === 0 && !isLoading) {
      fetchsliderinfo(); // Trigger fetch if not already fetching
    }
  }, [sliderinfo.length, fetchsliderinfo, isLoading]);

  const cards = [
    {
      header: "OUR MISSION",
      text: "RDF helps the poor by ensuring rights, education, skills, health, and resilience.",
      icon: missionIcon,
    },
    {
      header: "OUR VISION",
      text: "RDF envisions a just, equitable society empowering women, children, and inclusivity.",
      icon: visionIcon,
    },
    {
      header: "OUR CORE VALUE",
      text: "Transparency, Accountability, Inclusiveness, Values, Respect, Integrity.",
      icon: valueIcon,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Loading State */}

      {/* Slider Section */}
      {sliderinfo === 0 ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-gray-700"></div>
          <p className="text-lg ml-3">Loading...</p>
        </div>
      ) : (
        <Carousel
          className="w-full h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px]"
          autoplay={true}
          autoplayDelay={30000}
          loop={true}
        >
          {sliderinfo.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <img
                src={image.src}
                alt={`Slide ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
              {/* Text Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute bottom-10 right-5 md:right-10 lg:bg-black/50 sm:bg-black/10 p-6 md:p-8 rounded-xl max-w-xs md:max-w-lg text-right z-10"
              >
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-serif"
                >
                  {image.header}
                </Typography>
                <Typography
                  variant="lead"
                  color="white"
                  className="mb-4 opacity-90 text-xs sm:text-sm md:text-base font-serif"
                >
                  {image.text}
                </Typography>
                <Button
                  className="cursor-pointer hover:scale-110 transition-transform duration-300 text-white btn btn-info hover:"
                  size="md"
                >
                  Read more..
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </Carousel>
      )}

      {/* Cards Section Below the Slider */}
      <div className="hidden sm:flex relative -mt-16 z-10 flex-wrap justify-center items-center gap-6 px-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.5 }}
            onClick={() => navigate("/vision-mission")}
            className="bg-white p-6 rounded-xl shadow-lg shadow-gray-300 hover:shadow-gray-400 max-w-sm flex flex-col items-center text-center w-full sm:w-[300px] cursor-pointer"
          >
            <div className="flex justify-center items-center w-16 h-16">
              <img
                src={card.icon}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <Typography
              variant="h5"
              color="red"
              className="font-bold uppercase mt-2 mb-3 font-serif"
            >
              {card.header}
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="font-serif"
            >
              {card.text}
            </Typography>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
