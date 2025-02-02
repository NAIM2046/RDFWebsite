import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const ImageSlider = () => {
  const images = [
    "/assets/usaid-logo.webp",
    "/assets/bwdb-logo-.webp",
    "/assets/partner-1.webp",
    "/assets/partner-10.webp",
    "/assets/partner-3.webp",
    "/assets/partner-4.webp",
    "/assets/DAM-Logo.webp",
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">
          Our Development Partners
        </h2>
      </div>
      <div className="flex justify-center items-center bg-gray-100">
        <Swiper
          autoplay={{
            delay: 3000, // Automatically change slide every 3 seconds
            disableOnInteraction: false, // Keep autoplay after user interaction
          }}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          spaceBetween={30}
          coverflowEffect={{
            rotate: -20,
            stretch: 1,
            depth: 250,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]} // Include Autoplay module
          className="w-full max-w-5xl"
          breakpoints={{
            320: { slidesPerView: 1 }, // 1 image per view on small screens
            640: { slidesPerView: 2 }, // 2 images per view on medium screens
            1024: { slidesPerView: 3 }, // 3 images per view on large screens
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide
              key={index}
              className="w-64 h-64 flex justify-center items-center"
            >
              <a href="#">
                <img
                  src={img}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageSlider;
