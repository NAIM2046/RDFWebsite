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

  const sortedNews = useMemo(
    () =>
      [...newss]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6),
    [newss]
  );

  return (
    <motion.section
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Latest Updates
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            News & Blog
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Stay updated with our latest stories, insights, and company news
          </motion.p>
        </div>

        {/* Blog Grid */}
        {newss.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-96 bg-gray-200 rounded-xl"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sortedNews.map((news, index) => (
              <motion.article
                key={news._id}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() =>
                  navigate(`/news/${news._id}`, { state: { news } })
                }
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-60">
                  <img
                    src={news.imageURL || "/placeholder-news.jpg"}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-medium">Read More →</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex justify-between text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-indigo-500" />
                      {new Date(news.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaUser className="text-indigo-500" />
                      {news.author || "Admin"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {news.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {news.content?.[0]?.description ||
                      "No description available."}
                  </p>

                  {/* Read More Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/news/${news._id}`, { state: { news } });
                    }}
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer transition-colors"
                  >
                    Read more
                    <IoIosArrowRoundForward className="ml-1 text-xl" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={() => navigate("/news")}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            View All News
            <IoIosArrowRoundForward className="text-xl" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BlogSection;
