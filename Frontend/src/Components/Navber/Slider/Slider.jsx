import { Typography, Button } from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";
import useRDFStore from "../../../storage/useRDFstorage";
import { useEffect, useState, useCallback } from "react";

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
    (a, b) => a.slideNumber - b.slideNumber,
  );

  const length = sortedSliderInfo.length;

  // Slide navigation logic
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % length);
  }, [length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + length) % length);
  }, [length]);

  // Autoplay logic
  useEffect(() => {
    let interval;
    if (isAutoPlaying && length > 1) {
      // Changed from 100000 (100s) to 5000 (5s) for a natural slide duration
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, length, nextSlide]);

  // Fallback image handler
  const handleImageError = (e) => {
    e.target.src = "/images/fallback-slide.jpg";
  };

  // Loading skeleton - height adjusted responsively
  if (isLoading || length === 0) {
    return (
      <div className="relative w-full aspect-[4/3] sm:aspect-video md:aspect-auto md:h-[60vh] lg:h-[70vh] bg-neutral-100 top-20 sm:top-2 overflow-hidden flex items-center justify-center">
        {/* Immersive Shimmering Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />

        {/* Top Title Badge Placeholder */}
        <div className="absolute top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-30 w-11/12 max-w-[320px] sm:max-w-[400px] h-9 md:h-12 bg-neutral-300/60 backdrop-blur-sm rounded-full animate-pulse" />

        {/* Center Subtle Brand Accent (instead of a harsh spinner) */}
        <div className="relative z-10 flex flex-col items-center gap-3 opacity-40">
          <div className="h-10 w-10 border-2 border-emerald-800/30 border-t-emerald-800 rounded-full animate-spin" />
          <span className="text-xs font-serif tracking-widest text-emerald-900 uppercase font-medium animate-pulse">
            Loading
          </span>
        </div>

        {/* Bottom Right Content Card Placeholder */}
        <div className="absolute bottom-10 right-2 md:bottom-16 md:right-16 bg-neutral-200/50 backdrop-blur-md p-4 md:p-8 rounded-2xl w-[220px] sm:w-[350px] md:w-[400px] h-32 md:h-44 flex flex-col items-end justify-between border border-white/20 shadow-xl">
          <div className="w-4/5 h-5 bg-neutral-300/80 rounded-md animate-pulse" />
          <div className="w-full h-4 bg-neutral-300/60 rounded-md animate-pulse mt-2 hidden md:block" />
          <div className="w-2/3 h-4 bg-neutral-300/60 rounded-md animate-pulse hidden md:block" />
          <div className="w-24 h-8 bg-neutral-300/90 rounded-full animate-pulse mt-4" />
        </div>

        {/* Bottom Pagination Dots Placeholder */}
        <div className="absolute bottom-3 md:bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
          <div className="h-2 w-6 bg-neutral-300/80 rounded-full animate-pulse" />
          <div className="h-2 w-2 bg-neutral-300/40 rounded-full" />
          <div className="h-2 w-2 bg-neutral-300/40 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full aspect-[4/3] sm:aspect-video md:aspect-auto md:h-[60vh] lg:h-[70vh] group overflow-hidden bg-gray-50 top-20 sm:top-2"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Main Title */}
      <div className="absolute top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-30 w-11/12 max-w-max">
        <h1 className="text-center font-serif font-bold text-green-500 px-4 md:px-6 py-2 md:py-3 bg-black/30 backdrop-blur-md rounded-full text-xs sm:text-sm md:text-lg lg:text-xl border border-white/20 shadow-lg">
          Resource Development Foundation (RDF)
        </h1>
      </div>

      {/* Slides using AnimatePresence for Crossfade effect */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          {/* Background Image */}
          <img
            src={sortedSliderInfo[currentSlide].src}
            alt={
              sortedSliderInfo[currentSlide].alt || `Slide ${currentSlide + 1}`
            }
            loading={currentSlide === 0 ? "eager" : "lazy"}
            onError={handleImageError}
            className="w-full h-full object-cover object-center"
          />

          {/* Text Content Container */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-10 right-2 md:bottom-16 md:right-16 bg-white/80 backdrop-blur-md p-4 md:p-8 rounded-2xl max-w-[220px] sm:max-w-sm md:max-w-md lg:max-w-md text-right z-20 border border-white/40 shadow-xl"
          >
            {/* Header: Styled with a rich deep green color */}
            <Typography
              variant="h2"
              className="mb-2 text-sm sm:text-base md:text-2xl lg:text-xl font-bold font-serif leading-tight text-emerald-900"
            >
              {sortedSliderInfo[currentSlide].header}
            </Typography>

            {/* CTA Button */}
            {sortedSliderInfo[currentSlide].ctaText &&
              sortedSliderInfo[currentSlide].ctaLink && (
                <Button
                  size="sm"
                  color="green"
                  variant="filled"
                  className="mt-2 md:mt-3 bg-emerald-800 text-white hover:bg-emerald-900 transition-all duration-300 rounded-full px-3 md:px-6 py-1.5 md:py-2 text-xs md:text-sm shadow-md"
                  onClick={() =>
                    window.open(
                      sortedSliderInfo[currentSlide].ctaLink,
                      "_blank",
                    )
                  }
                >
                  {sortedSliderInfo[currentSlide].ctaText}
                </Button>
              )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md border border-white/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 md:h-6 md:w-6"
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

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md border border-white/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 md:h-6 md:w-6"
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

      {/* Pagination Dots */}
      <div className="absolute bottom-3 md:bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2 md:gap-3">
        {sortedSliderInfo.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 md:h-2.5 rounded-full transition-all duration-500 ${
              currentSlide === i
                ? "w-6 md:w-10 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                : "w-1.5 md:w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-30 bg-black/40 hover:bg-black/60 text-white p-1.5 md:p-2.5 rounded-full transition-all backdrop-blur-md border border-white/20 shadow-lg"
        title={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isAutoPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 md:h-5 md:w-5"
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
            className="h-4 w-4 md:h-5 md:w-5"
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
