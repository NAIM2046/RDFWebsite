import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useRDFStore from "../../../storage/useRDFstorage";

const OurActivities = () => {
  const navigate = useNavigate();
  const { fetchActivites, activities } = useRDFStore();

  useEffect(() => {
    if (activities.length === 0) {
      fetchActivites();
    }
  }, []);

  return (
    <div className="text-center py-10 px-4 bg-amber-50 font-serif">
      {/* <motion.h3
        className="text-sm text-green-500 tracking-widest uppercase"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        This is What We Do
      </motion.h3> */}

      <motion.h2
        className="text-3xl font-bold text-indigo-900 mt-2 font-serif"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Our Programs align with SDGs
      </motion.h2>

      {activities.length === 0 ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-gray-700"></div>
          <p className="text-lg ml-3">Loading...</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-5 mt-8 max-w-6xl mx-auto px-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity._id}
              onClick={() =>
                navigate("/activities-details", { state: { activity } })
              }
              className="rounded-lg overflow-hidden shadow-2xl transition-transform duration-300 ease-in-out hover:shadow-xl border-4 cursor-pointer border-white w-full sm:w-[calc(33.333%-1.25rem)] lg:w-[calc(20%-1.25rem)]"
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={activity.img}
                alt={activity.title}
                loading="lazy"
                className="w-full h-full sm:h-40 md:h-48 object-cover"
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OurActivities;
