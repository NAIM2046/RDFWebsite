import React, { useState } from "react";
import OurApproach from "./OurApproach";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import coverimg from "/assets/Untitled design.png";

const WeWorkFor = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <PageCoverPhoto
        title="We Work For"
        subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
        imageUrl={coverimg}
      />
      <div className="bg-gray-100 text-gray-900">
        {/* Who We Serve Section */}
        <section className="py-16 px-6 md:px-20">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Who We Serve
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Children", img: "assets/we_work_1.jpg" },
              { title: "Women", img: "assets/we_work_2.jpg" },
              { title: "Environment", img: "assets/we_work_3.jpg" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 text-center"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full mx-auto"
                />
                <h3 className="text-xl font-semibold mt-3">{item.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Focus Areas */}
        <section className="bg-white py-16 px-6 md:px-20">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Our Focus Areas
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Education",
              "Healthcare",
              "Women Empowerment",
              "Sustainability",
            ].map((area, index) => (
              <div
                key={index}
                className="bg-blue-500 text-white rounded-lg p-6 text-center shadow-md"
              >
                <h3 className="text-xl font-semibold">{area}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 px-6 md:px-20">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { number: "10,000+", label: "Children Educated" },
              { number: "5,000+", label: "Medical Camps" },
              { number: "100,000+", label: "Trees Planted" },
              { number: "500+", label: "Families Rehabilitated" },
            ].map((stat, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-3xl font-bold text-blue-600">
                  {stat.number}
                </h3>
                <p className="text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="container mx-auto p-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            🌍 Where We Work
          </h2>
          <p className="text-center text-gray-600 mb-6">
            We operate in several districts across Bangladesh, focusing on
            education, healthcare, and community development.
          </p>

          {/* Small Map Preview with Hover Tooltip */}
          <div
            onClick={() => setIsOpen(true)}
            className="flex justify-center relative group"
          >
            <img
              src="/assets/map.png"
              alt="Where We Work Map"
              className="w-1/2 md:w-1/3 cursor-pointer rounded-lg shadow-lg hover:scale-105 transition"
            />

            {/* Tooltip Message (Centered on Image) */}
            <span className="absolute inset-0 flex justify-center items-center text-black text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-90 transition">
              Click to Enlarge 📌
            </span>
          </div>

          {/* Full-Screen Image Modal */}
          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
              <div className="relative">
                {/* Close Button (Top-Right) */}
                <button
                  className="absolute top-2 right-2 text-white text-3xl font-bold bg-gray-900 px-3 py-1 rounded-full hover:bg-gray-700 transition"
                  onClick={() => setIsOpen(false)}
                >
                  ✖
                </button>

                <img
                  src="/assets/map.png"
                  alt="Full Map"
                  className="w-[90%] md:w-[70%] lg:w-[90%] rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
        </div>

        {/* Testimonials */}
        <section className="bg-gray-200 py-16 px-6 md:px-20">
          <h2 className="text-3xl font-semibold text-center mb-6">
            What People Say
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg italic">
              “This NGO has transformed our community by providing education and
              healthcare to those in need.”
            </p>
            <h3 className="font-semibold mt-4">- John Doe, Beneficiary</h3>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 text-white py-16 text-center">
          <h2 className="text-3xl font-semibold">
            Join Us in Making a Difference
          </h2>
          <p className="text-lg mt-2">
            Become a volunteer or support our cause today!
          </p>
          <div className="mt-6">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold mx-2">
              Donate Now
            </button>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold mx-2">
              Join Us
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WeWorkFor;
