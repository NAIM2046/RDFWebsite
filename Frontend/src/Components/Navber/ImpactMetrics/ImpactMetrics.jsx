import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Globe, Users, CheckCircle } from "lucide-react"; // Import icons

const metrics = [
  { title: "Upazila Working Area", value: 1000, icon: <MapPin size={50} /> },
  { title: "Districts Working Area", value: 64, icon: <Globe size={50} /> },
  { title: "Beneficiary in Bangladesh", value: 100, icon: <Users size={50} /> },
  { title: "Projects Completed", value: 100, icon: <CheckCircle size={50} /> },
];

const ImpactMetrics = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="py-16 px-6 bg-gradient-to-r from-green-50 to-green-100 text-gray-900"
    >
      <div className="max-w-6xl mx-auto text-center font-serif">
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
          className="text-lg text-gray-600 mb-10 font-serif"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Our efforts have transformed communities across Bangladesh.
        </motion.p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-xl p-8 rounded-2xl flex flex-col items-center transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              {/* Icon */}
              <div className="text-green-600">{metric.icon}</div>

              {/* Title */}
              <h3 className="text-lg font-semibold mt-4 text-gray-700">
                {metric.title}
              </h3>

              {/* CountUp Animation */}
              <p className="text-3xl font-bold text-green-600 mt-2">
                {inView ? (
                  <CountUp end={metric.value} duration={2.5} separator="," />
                ) : (
                  0
                )}
                +
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
