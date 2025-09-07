import React, { useEffect } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Globe, Users, CheckCircle, Home } from "lucide-react"; // Added Home icon
import useRDFStore from "../../../storage/useRDFstorage";

const ImpactMetrics = () => {
  const { fetchProjects, projects } = useRDFStore();
  useEffect(() => {
    if (projects.length === 0) {
      fetchProjects();
    }
  }, []);

  const metrics = [
    { title: "Working Upazila", value: 60, icon: <MapPin size={50} /> },
    { title: "Working District", value: 21, icon: <Globe size={50} /> },
    { title: "Field Office", value: 82, icon: <Home size={50} /> }, // Changed to Home icon
    {
      title: "Project Completed",
      value: 49,
      icon: <CheckCircle size={50} />,
    },
    {
      title: "Beneficiary Reached ",
      value: 319135,
      icon: <Users size={50} />,
    },
  ];

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <section
      ref={ref}
      className="py-16 px-6 bg-gradient-to-r bg-green-50 text-gray-900"
    >
      <div className="max-w-7xl mx-auto text-center font-serif">
        {" "}
        {/* Increased max-width */}
        {/* Heading Animation */}
        <motion.h2
          className="text-4xl font-bold mb-6 text-gray-800 font-serif"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          OUR IMPACT
        </motion.h2>
        {/* Subtitle Animation */}
        <motion.p
          className="text-lg text-green-500 mb-10 font-serif"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Our efforts have transformed communities across Bangladesh.
        </motion.p>
        {/* Cards Section - Updated to 5 columns on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-2xl flex flex-col items-center transition-all duration-300 hover:scale-105 ${
                index % 2 === 0
                  ? "bg-blue-950"
                  : "bg-gradient-to-r from-blue-800 to-blue-900 shadow-xl"
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Icon */}
              <div
                className={
                  index % 2 === 0 ? "text-green-400" : "text-yellow-500"
                }
              >
                {metric.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mt-4 text-white text-center">
                {metric.title}
              </h3>

              {/* CountUp Animation */}
              <p
                className={`text-3xl font-bold mt-2 ${
                  index % 2 === 0 ? "text-green-400" : "text-pink-400"
                }`}
              >
                {inView ? (
                  <CountUp
                    end={
                      index === 3
                        ? metric.value + projects.length
                        : metric.value
                    }
                    duration={2.5}
                    separator=","
                  />
                ) : (
                  0
                )}
                {index === 4 ? "+" : "+"}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
