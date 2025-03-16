import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendarDays } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";
import useRDFStore from "../../../storage/useRDFstorage";
import { useNavigate } from "react-router-dom";

const BlogSection = () => {
  const { newss, fetchNews } = useRDFStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!newss.length) {
      fetchNews();
    }
  }, []);

  // Sort news by date (newest first)
  const sortedNews = [...newss].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Function to limit description to 30 words
  const truncateDescription = (text, wordLimit = 30) => {
    return text.split(" ").slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <motion.section
      className="py-24 px-4 bg-gray-100"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12 font-serif"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Our Latest News & Blogs
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedNews.slice(0, 6).map((news, index) => (
            <motion.div
              key={news._id}
              className="group border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-101 bg-white"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1.2, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center">
                <img
                  src={news.imageURL}
                  alt={`Blog image ${news._id}`}
                  className="rounded-t-2xl w-full h-56 object-cover"
                />
              </div>
              <div className="p-6 transition-all duration-300 group-hover:bg-gray-50">
                <span className="text-indigo-600 font-medium flex items-center space-x-2 mb-3">
                  <FaCalendarDays className="text-lg" />
                  <p>{new Date(news.date).toDateString()}</p>
                  <span className="text-gray-500">| {news.author}</span>
                </span>
                <h4 className="text-xl text-gray-900 font-semibold leading-8 mb-4">
                  {news.title}
                </h4>
                <p className="text-gray-600 leading-6 mb-8">
                  {truncateDescription(news.content[0].description)}
                </p>
                <button
                  onClick={() =>
                    navigate(`/news/${news._id}`, { state: { news } })
                  }
                  className="flex items-center space-x-2 text-indigo-600 font-semibold border border-indigo-600 px-4 py-2 rounded-lg transition-all hover:bg-indigo-600 hover:text-white cursor-pointer"
                >
                  <span>Read Details</span>
                  <IoIosArrowRoundForward className="text-xl" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        {/* View All Button */}
        <motion.div
          className="text-center mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={() => navigate("/news")}
            className="text-lg text-indigo-600 font-semibold hover:underline flex items-center space-x-2 font-serif cursor-pointer"
          >
            <span>VIEW ALL NEWS</span>
            <IoMdArrowRoundForward className="text-2xl ml-2" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BlogSection;
