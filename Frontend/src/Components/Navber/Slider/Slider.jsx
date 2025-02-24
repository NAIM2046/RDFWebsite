import { Carousel, Typography, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import slide1 from "../../../assets/1st-slide.webp"; // Adjust the local image path
import { useNavigate } from "react-router-dom";
import visionIcon from "/assets/vission.jpg";
import missionIcon from "/assets/mission.jpg";
import valueIcon from "/assets/value-1.jpg";
const Slider = () => {
  const images = [
    {
      src: "https://i.ibb.co.com/b51cBsPp/BNFP-3.jpg",
      header: "The Beauty of Nature",
      text: "It is not so much for its beauty that the forest makes a claim.",
    },
    {
      src: "/assets/RDF Photo/DJI_0161.JPG",
      header: "The Beauty of Nature",
      text: "The quality of air that emanates from old trees wonderfully changes a weary spirit.",
    },
    {
      src: "/assets/RDF Photo/CEMB (7).JPG",
      header: "The Beauty of Nature",
      text: "Forests renew the human soul with their silent presence.",
    },
    {
      src: "/assets/RDF Photo/20231226_120135.jpg",
      header: "The Beauty of Nature",
      text: "Forests renew the human soul with their silent presence.",
    },
  ];

  const cards = [
    {
      header: "OUR MISSION",
      text: "The journey towards the vision.",
      icon: missionIcon,
    },
    {
      header: "OUR VISION",
      text: "The future the NGO intends to create.",
      icon: visionIcon,
    },
    {
      header: "OUR CORE VALUE",
      text: "The guiding principles for which we stand.",
      icon: valueIcon,
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="w-full">
      {/* Slider Section */}
      <Carousel
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[600px]"
        autoplay={true}
        autoplayDelay={10000}
        loop={true}
      >
        {images.map((image, index) => (
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
              className="w-full h-full object-cover object-center"
            />
            {/* Text Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-10 right-5 md:right-10 lg:bg-black/50 sm:bg-black/10  p-6 md:p-8 rounded-xl max-w-xs md:max-w-lg text-right z-10"
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
                className="cursor-pointer hover:scale-110 transition-transform duration-300 text-white btn btn-info hover:bg-red-600"
                size="md"
              >
                Read more..
              </Button>
            </motion.div>
          </motion.div>
        ))}
      </Carousel>

      {/* Cards Section Below the Slider */}
      <div className="hidden sm:flex relative -mt-16 z-10 flex-wrap justify-center items-center gap-6 px-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.5 }}
            onClick={() => navigate("/vision-mission")}
            className="bg-white p-6 rounded-xl shadow-lg max-w-sm flex flex-col items-center text-center w-full sm:w-[300px] cursor-pointer"
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
            <Typography variant="paragraph" color="blue-gray">
              {card.text}
            </Typography>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
