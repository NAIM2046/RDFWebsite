import { Carousel, Typography, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import useRDFStore from "../../../storage/useRDFstorage";
import { useEffect, useState } from "react";

const Slider = () => {
  const { isLoading, sliderinfo, fetchsliderinfo } = useRDFStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Fetch slider info
  useEffect(() => {
    if (sliderinfo.length === 0 && !isLoading) {
      fetchsliderinfo();
    }
  }, [sliderinfo.length, fetchsliderinfo, isLoading]);

  // Sort slider info by slideNumber
  const sortedSliderInfo = [...sliderinfo].sort(
    (a, b) => a.slideNumber - b.slideNumber
  );

  // Handle slide change
  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  // Pause autoplay on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Fallback image for broken images
  const handleImageError = (e) => {
    const target = e.target;
    target.src = "/images/fallback-slide.jpg";
  };

  // Loading skeleton
  if (isLoading || sliderinfo.length === 0) {
    return (
      <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>

        <div className="text-center relative z-10">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 mx-auto mb-4"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-t-4 border-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-700 text-lg font-semibold mt-4">
            Loading amazing content...
          </p>
          <p className="text-gray-500 text-sm mt-2">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-center font-serif font-bold text-white px-4 py-2 bg-black/10 backdrop-blur-sm rounded-lg text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl border border-white/20">
          Resource Development Foundation (RDF)
        </h1>
      </div>

      {/* Carousel */}
      <Carousel
        className="w-full h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px]"
        autoplay={isAutoPlaying}
        autoplayDelay={6000} // Reduced to 5 seconds for better UX
        loop={true}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-2 cursor-pointer rounded-full transition-all ${
                  activeIndex === i ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
        onActiveIndexChange={handleSlideChange}
        prevArrow={({ handlePrev }) => (
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        nextArrow={({ handleNext }) => (
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      >
        {sortedSliderInfo.map((slide, index) => (
          <motion.div
            key={slide.id || index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            {/* Background Image with Loading State */}
            <div className="relative w-full h-full">
              <img
                src={slide.src}
                alt={slide.alt || `Slide ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                onError={handleImageError}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Text Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute bottom-4 right-4 md:bottom-10 md:right-10 bg-black/10 backdrop-blur-sm p-4 md:p-6 rounded-xl max-w-xs md:max-w-md lg:max-w-lg text-right z-10 border border-white/10"
            >
              <Typography
                variant="h1"
                color="white"
                className="mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-serif leading-tight"
              >
                {slide.header}
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-3 opacity-95 text-xs sm:text-sm md:text-base font-serif leading-relaxed"
              >
                {slide.text}
              </Typography>

              {/* Optional CTA Button */}
              {slide.ctaText && slide.ctaLink && (
                <Button
                  size="sm"
                  color="white"
                  variant="outlined"
                  className="mt-2 border-white text-white hover:bg-white hover:text-black transition-colors"
                  onClick={() => window.open(slide.ctaLink, "_blank")}
                >
                  {slide.ctaText}
                </Button>
              )}
            </motion.div>

            {/* Slide Progress Indicator */}
            <div className="absolute top-4 right-4 z-20 bg-black/50 text-white px-2 py-1 rounded text-xs">
              {index + 1} / {sortedSliderInfo.length}
            </div>
          </motion.div>
        ))}
      </Carousel>

      {/* Pause/Play Button */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 right-4 z-30 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all backdrop-blur-sm"
        title={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isAutoPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Slider;
