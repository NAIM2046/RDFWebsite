import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useRDFStore from "../../../storage/useRDFstorage";

const OurPartners = () => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const { partners, fetchPartner } = useRDFStore();

  useEffect(() => {
    if (partners.length === 0) {
      fetchPartner();
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-10 bg-white font-serif">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 transition-transform duration-500 hover:scale-105">
        Our Partners
      </h1>

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
        customTransition="transform 0.5s ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {partners.map((partner, index) => (
          <a
            key={index}
            href={partner.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center p-4 group transition-transform duration-500 hover:scale-110"
          >
            <img
              src={partner.logo}
              alt={partner.alt || partner.name}
              className="w-40 h-auto object-contain shadow-lg rounded-lg transition-opacity duration-500 group-hover:opacity-80"
            />
          </a>
        ))}
      </Carousel>
    </div>
  );
};

export default OurPartners;
