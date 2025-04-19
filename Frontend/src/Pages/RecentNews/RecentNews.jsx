import React, { useEffect, useState } from "react";
import useRDFStore from "../../storage/useRDFstorage";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet-async";
import { FaArrowRight, FaCalendarAlt, FaUser } from "react-icons/fa";

const RecentNews = () => {
  const { newss, fetchNews } = useRDFStore();
  const location = useLocation();
  const path = location.pathname.split("/").filter(Boolean).pop();
  const [currentPage, setCurrentPage] = useState(0);
  const newsPerPage = 4; // Show 12 news items per page
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
  console.log(filterNews);
  console.log(newss);
  console.log(path);

  // Pagination Logic
  const offset = currentPage * newsPerPage;
  const currentNews = filterNews.slice(offset, offset + newsPerPage);
  const pageCount = Math.ceil(sortedNews.length / newsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="mx-auto">
      <Helmet>
        <title> RDF-News </title>
      </Helmet>
      <PageCoverPhoto
        title={path.toUpperCase()}
        subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
      />
      <div className="mx-auto max-w-6xl mb-5">
        <h2 className="text-3xl font-bold text-gray-800 my-6 text-center font-serif">
          LATEST {path.toUpperCase()}
        </h2>

        <div className=" m-2 md:m-0 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentNews.length > 0 ? (
            currentNews.map((news) => (
              <div
                key={news._id}
                className="rounded-xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden w-full max-w-md mx-auto"
              >
                {/* Image Section */}
                <div className="relative w-full h-56 sm:h-64 md:h-72">
                  <img
                    src={news.imageURL}
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-6 flex flex-col justify-between flex-grow space-y-4">
                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 hover:text-blue-600 transition">
                    {news.title}
                  </h3>

                  {/* Author and Date */}
                  <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
                    <span className="flex items-center gap-2">
                      <FaUser className="text-blue-700" />
                      {news.author}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-600" />
                      {new Date(news.date).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {news.content &&
                    news.content.length > 0 &&
                    news.content[0].description
                      ? news.content[0].description.slice(0, 120) + "..."
                      : "No description available."}
                  </p>

                  {/* Read More Button */}
                  <div className="mt-4">
                    <button
                      onClick={() =>
                        navigate(`/news/${news._id}`, { state: { news } })
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition font-medium w-[40%] sm:w-auto cursor-pointer"
                    >
                      Read More <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3 font-bold font-serif">
              No news available.
            </p>
          )}
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="flex justify-center mt-6">
            <ReactPaginate
              previousLabel="«"
              nextLabel="»"
              breakLabel="..."
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName="flex items-center space-x-2  rounded-lg p-2"
              pageClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
              activeClassName="bg-blue-500 text-white"
              previousClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
              nextClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentNews;
