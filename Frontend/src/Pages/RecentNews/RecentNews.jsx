import React, { useEffect, useState } from "react";
import useRDFStore from "../../storage/useRDFstorage";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet-async";
import { FaArrowRight, FaCalendarAlt, FaUser, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const RecentNews = () => {
  const { newss, fetchNews } = useRDFStore();
  const location = useLocation();
  const path = location.pathname.split("/").filter(Boolean).pop();
  const [currentPage, setCurrentPage] = useState(0);
  const newsPerPage = 9; // Show 9 news items per page for better grid layout
  const navigate = useNavigate();

  useEffect(() => {
    if (!newss.length) {
      fetchNews();
    }
  }, [newss, fetchNews]);

  // Sort news by date (latest first)
  const sortedNews = [...newss].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const filterNews = newss.filter((news) => news.type === path);

  // Pagination Logic
  const offset = currentPage * newsPerPage;
  const currentNews = filterNews.slice(offset, offset + newsPerPage);
  const pageCount = Math.ceil(filterNews.length / newsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate reading time
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const textLength = text ? text.split(/\s+/).length : 0;
    return Math.ceil(textLength / wordsPerMinute);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{`RDF - ${path.charAt(0).toUpperCase() + path.slice(1)}`}</title>
      </Helmet>

      <PageCoverPhoto
        title={path
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
        subtitle="Stay updated with our latest news and announcements"
        imageUrl={
          "assets/news/newspaper-dhaka-Tribune-09d219b91c49bc59cb83de5f8f30788b.jpg"
        }
      />

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">
            Latest{" "}
            {path
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        {currentNews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentNews.map((news) => (
                <motion.div
                  key={news._id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full"
                >
                  {/* Image Section */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <img
                      src={news.imageURL}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {news.type}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Meta Info */}
                    <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                      <span className="flex items-center">
                        <FaUser className="mr-1 text-blue-600" />
                        {news.author}
                      </span>
                      <span className="flex items-center">
                        <FaCalendarAlt className="mr-1 text-blue-600" />
                        {formatDate(news.date)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors">
                      {news.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 flex-grow">
                      {news.content?.[0]?.description
                        ? `${news.content[0].description.substring(0, 150)}...`
                        : "No description available."}
                    </p>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className="flex items-center text-sm text-gray-500">
                        <FaClock className="mr-1" />
                        {calculateReadingTime(
                          news.content?.[0]?.description || ""
                        )}{" "}
                        min read
                      </span>
                      <button
                        onClick={() =>
                          navigate(`/news/${news._id}`, { state: { news } })
                        }
                        className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors cursor-pointer"
                      >
                        Read More <FaArrowRight className="ml-2" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {pageCount > 1 && (
              <div className="flex justify-center mt-12">
                <ReactPaginate
                  previousLabel={
                    <span className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
                      « Previous
                    </span>
                  }
                  nextLabel={
                    <span className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
                      Next »
                    </span>
                  }
                  breakLabel={<span className="px-3 py-1">...</span>}
                  pageCount={pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName="flex items-center space-x-2"
                  pageClassName="hidden sm:block"
                  pageLinkClassName="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                  activeLinkClassName="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                  previousClassName="mr-2"
                  nextClassName="ml-2"
                  disabledClassName="opacity-50 cursor-not-allowed"
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              No news available at the moment
            </h3>
            <p className="text-gray-500 mb-6">
              Check back later for updates or explore other sections of our
              site.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentNews;
