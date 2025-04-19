import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import useRDFStore from "../../../storage/useRDFstorage";
import { useNavigate } from "react-router-dom";

const BlogSection = () => {
  const { newss, fetchNews } = useRDFStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!newss.length) {
      fetchNews();
    }
  }, [newss, fetchNews]);

  // Optimized sorting and limiting with useMemo
  const sortedNews = useMemo(
    () =>
      [...newss]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6),
    [newss]
  );

  return (
    <motion.section
      className="py-2 px-6 bg-gray-50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.h2
          className="text-4xl font-extrabold text-green-900 text-center mb-5 font-serif"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Latest News & Blogs
        </motion.h2>

        {/* Blog Grid */}
        {newss.length === 0 ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-gray-700"></div>
            <p className="text-lg ml-3">Loading News...</p>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {sortedNews.map((news, index) => (
              <motion.article
                key={news._id}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Image */}
                <img
                  src={news.imageURL}
                  alt={news.title}
                  className="w-full h-60 object-cover rounded-t-xl group-hover:brightness-90 transition-all"
                />

                {/* Blog Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex justify-between text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-2">
                      <FaCalendarAlt className="text-indigo-600" />
                      {new Date(news.date).toDateString()}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaUser className="text-indigo-600" />
                      {news.author}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 leading-7 mb-3">
                    {news.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {news.content &&
                    news.content.length > 0 &&
                    news.content[0].description
                      ? news.content[0].description.slice(0, 150) + "..."
                      : "No description available."}
                  </p>

                  {/* Read More Button */}
                  <button
                    onClick={() =>
                      navigate(`/news/${news._id}`, { state: { news } })
                    }
                    className="flex items-center gap-2 text-indigo-600 font-semibold border border-indigo-600 px-2 py-2 rounded-lg transition-all hover:bg-indigo-600 hover:text-white cursor-pointer"
                  >
                    <span>Read More</span>
                    <IoIosArrowRoundForward className="text-2xl rotate-315 " />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* View All Button - Perfectly Centered */}
        <motion.div
          className="flex justify-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={() => navigate("/news")}
            className="text-lg text-indigo-600 font-semibold font-serif hover:underline flex items-center gap-2 cursor-pointer"
          >
            <span>VIEW ALL NEWS</span>
            <IoIosArrowRoundForward className="text-2xl" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BlogSection;
