import React from "react";

const weWorkForData = [
  {
    title: "The most socially & politically marginalized women",
    image: "/assets/rdfphoto2/PRA, Joyalbhanga.jpg",
  },
  {
    title: "Underprivileged children & youth",
    image: "/assets/children.webp",
  },
  {
    title: "Rural & Indigenous communities",
    image: "/assets/rdfphoto2/IMG_20210320_164610.jpg",
  },
  {
    title: "People affected by natural disasters",
    image: "/assets/rdfphoto2/IMG_20201231_111258.jpg",
  },
  {
    title: "Persons with disabilities",
    image: "/assets/rdfphoto1/DSC03021.JPG",
  },
  {
    title: "Elderly & abandoned seniors",
    image: "/assets/rdfphoto1/Edsc.JPG",
  },
];

const WeWorkFor = () => {
  return (
    <div id="weworkfor" className="max-w-6xl mx-auto p-6 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        We <span className="text-orange-500">Work For</span>
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto mb-10">
        Our organization is committed to uplifting marginalized communities by
        addressing their unique challenges and empowering them through
        sustainable solutions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {weWorkForData.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-all"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-52 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeWorkFor;
