import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const metrics = [
  { title: "Lives Impacted", value: 50000, icon: "🌍" },
  { title: "Funds Raised", value: 1000000, icon: "💰", prefix: "$" },
  { title: "Volunteers Engaged", value: 5000, icon: "🙌" },
  { title: "Projects Completed", value: 100, icon: "🏗" },
];

const ImpactMetrics = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-blue-100 text-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-6 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Impact Metrics
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Our efforts have made a significant difference in communities
          worldwide.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-xl p-8 rounded-2xl flex flex-col items-center transform transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.1, rotate: 2 }}
            >
              <div className="text-5xl">{metric.icon}</div>
              <h3 className="text-lg font-semibold mt-4 text-gray-700">
                {metric.title}
              </h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {metric.prefix && metric.prefix}
                <CountUp end={metric.value} duration={2.5} separator="," />+
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
