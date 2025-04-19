import React, { useEffect } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Globe, Users, CheckCircle } from "lucide-react"; // Import icons
import useRDFStore from "../../../storage/useRDFstorage";

const ImpactMetrics = () => {
  const { fetchProjects, projects } = useRDFStore();
  useEffect(() => {
    if (projects.length === 0) {
      fetchProjects();
    }
  }, []);
  const metrics = [
    { title: "Upazila Working Area", value: 1000, icon: <MapPin size={50} /> },
    { title: "Districts Working Area", value: 55, icon: <Globe size={50} /> },
    {
      title: "Beneficiary in Bangladesh",
      value: 100,
      icon: <Users size={50} />,
    },
    {
      title: "Projects Completed",
      value: 100,
      icon: <CheckCircle size={50} />,
    },
  ];

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <section
      ref={ref}
      className="py-16 px-6 bg-gradient-to-r bg-green-50 text-gray-900"
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
          className="text-lg text-green-500 mb-10 font-serif"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Our efforts have transformed communities across Bangladesh.
        </motion.p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div
            className="bg-blue-950  p-8 rounded-2xl flex flex-col items-center transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0 * 0.2, duration: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            {/* Icon */}
            <div className="text-green-400">{metrics[0].icon}</div>

            {/* Title */}
            <h3 className="text-lg font-semibold mt-4 text-white">
              {metrics[0].title}
            </h3>

            {/* CountUp Animation */}
            <p className="text-3xl font-bold text-green-400 mt-2">
              {inView ? (
                <CountUp end={metrics[0].value} duration={2.5} separator="," />
              ) : (
                0
              )}
              +
            </p>
          </motion.div>
          <motion.div
            className="bg-gradient-to-r from-blue-800 to-blue-900  p-8 rounded-2xl flex flex-col items-center transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 * 0.2, duration: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            {/* Icon */}
            <div className="text-yellow-500">{metrics[1].icon}</div>

            {/* Title */}
            <h3 className="text-lg font-semibold mt-4 text-white">
              {metrics[1].title}
            </h3>

            {/* CountUp Animation */}
            <p className="text-3xl font-bold text-pink-400 mt-2">
              {inView ? (
                <CountUp end={metrics[1].value} duration={2.5} separator="," />
              ) : (
                0
              )}
              +
            </p>
          </motion.div>

          <motion.div
            className="bg-blue-950   p-8 rounded-2xl flex flex-col items-center transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 3 * 0.2, duration: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            {/* Icon */}
            <div className="text-green-400">{metrics[3].icon}</div>

            {/* Title */}
            <h3 className="text-lg font-semibold mt-4 text-white">
              {metrics[3].title}
            </h3>

            {/* CountUp Animation */}
            <p className="text-3xl font-bold text-green-400 mt-2 ">
              {inView ? (
                <CountUp
                  end={metrics[3].value + projects.length}
                  duration={2.5}
                  separator=","
                />
              ) : (
                0
              )}
              +
            </p>
          </motion.div>
          <motion.div
            className="bg-gradient-to-r from-blue-800 to-blue-900 shadow-xl p-8 rounded-2xl flex flex-col items-center transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2 * 0.2, duration: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            {/* Icon */}
            <div className="text-yellow-500">{metrics[2].icon}</div>

            {/* Title */}
            <h3 className="text-lg font-semibold mt-4 text-white">
              {metrics[2].title}
            </h3>

            {/* CountUp Animation */}
            <p className="text-3xl font-bold text-pink-400  mt-2">
              {inView ? (
                <CountUp end={metrics[2].value} duration={2.5} separator="," />
              ) : (
                0
              )}
              M+
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
