import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const OurPartners = () => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const partners = [
    {
      src: "assets/RDF Photo/partner3.png",
      alt: "USAID",
      link: "#",
    },
    {
      src: "assets/RDF Photo/partner4.png",
      alt: "IDCOL",
      link: "#",
    },
    {
      src: "assets/RDF Photo/partner5.png",
      alt: "Govt. of Bangladesh",
      link: "#",
    },
    {
      src: "assets/RDF Photo/partner6.png",
      alt: "Govt. of Bangladesh",
      link: "#",
    },
    {
      src: "assets/RDF Photo/partner1.png",
      alt: "Govt. of Bangladesh",
      link: "#",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center py-10 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-700 font-serif">
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
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5s ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {partners.map((partner, index) => (
          <a
            key={index}
            href={partner.link}
            className="flex justify-center items-center p-4"
          >
            <img
              src={partner.src}
              alt={partner.alt}
              className="w-40 h-auto object-contain"
            />
          </a>
        ))}
      </Carousel>
    </div>
  );
};

export default OurPartners;
