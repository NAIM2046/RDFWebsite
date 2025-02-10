import React from "react";
import { FaBook, FaHeartbeat, FaLeaf, FaUsers } from "react-icons/fa";

const WhoWeAre = () => {
  const values = [
    {
      title: "Education",
      icon: <FaBook />,
      description: "Providing quality education for all.",
    },
    {
      title: "Healthcare",
      icon: <FaHeartbeat />,
      description: "Ensuring accessible healthcare services.",
    },
    {
      title: "Sustainability",
      icon: <FaLeaf />,
      description: "Promoting environmental sustainability.",
    },
    {
      title: "Empowerment",
      icon: <FaUsers />,
      description: "Strengthening communities worldwide.",
    },
  ];

  return (
    <div className="justify-items-center">
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          {/* Text & Content */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We are a global non-profit organization dedicated to empowering
              communities, supporting education, healthcare, and sustainability
              for a better future.
            </p>
            <a
              href="/about"
              className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg text-lg shadow-md hover:bg-blue-700 transition"
            >
              Learn More →
            </a>
          </div>

          {/* Key Values Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-blue-500 text-white p-4 rounded-full text-3xl">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mt-3 text-gray-800">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Video/Image Banner */}
          <div className="relative mt-16">
            <div className="w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                src="https://www.youtube.com/embed/xAz2pJdssIU"
                title="Who We Are - NGO Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className=" inset-0 flex items-center justify-center bg-opacity-20 text-black text-xl font-bold">
              Together, We Make a Difference.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhoWeAre;
