import React, { useState } from "react";

const WhereWeWork = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="m-4">
      <h2 className="text-3xl text-center font-bold font-serif text-blue-950">
        Where We Work
      </h2>

      <div className="flex flex-col md:flex-row bg-gray-50 max-w-6xl mx-auto my-10 space-x-4">
        {/* Left Image Section */}
        <div className="md:w-1/3 flex flex-col justify-center shadow-lg p-4">
          {/* Clickable Image */}
          <img
            src="https://i.ibb.co.com/sJggYDSZ/image.png" // Update this to the correct path
            alt="Working Area Map"
            className="shadow-lg shadow-gray-800 cursor-pointer transition-transform hover:scale-101"
            onClick={() => setIsOpen(true)}
          />
        </div>

        {/* Right Text Section */}
        <div className="md:w-2/3 mt-6 md:mt-0 md:pl-8 shadow-lg p-4">
          <h2 className="text-2xl font-bold text-green-500 mb-4">
            Resource Development Foundation (RDF)
          </h2>
          <p className="text-gray-600 text-md leading-relaxed">
            RDF is committed to holistic rural development, addressing
            livelihood, skill development, health, education, water and
            sanitation, and nutrition since 1988. Programs include microcredit,
            food security, disaster management, agriculture, child education,
            and human rights.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mt-3">
            RDF operates in 4032 Unions, 162 Municipalities, and 408 Upazilas
            across 53 districts, supporting over 15 million vulnerable people.
          </p>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 px-4">
          <div className="relative w-full max-w-3xl mx-auto">
            <img
              src="https://i.ibb.co.com/sJggYDSZ/image.png"
              alt="Fullscreen Map"
              className="w-full max-h-[100vh] object-contain rounded-md shadow-lg"
            />
            {/* Close Button */}
            <button
              className="absolute top-0 right-0 sm:top-0 sm:right-36 bg-red-600 text-white px-2 sm:px-3 py-1 rounded-full text-base sm:text-lg font-bold cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhereWeWork;
