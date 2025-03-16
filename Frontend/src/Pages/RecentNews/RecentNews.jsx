import React, { useEffect, useState } from "react";
import useRDFStore from "../../storage/useRDFstorage";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet-async";

const RecentNews = () => {
  const { newss, fetchNews } = useRDFStore();
  const location = useLocation();
  const path = location.pathname.split("/").filter(Boolean).pop();
  const [currentPage, setCurrentPage] = useState(0);
  const newsPerPage = 12; // Show 12 news items per page
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

  // Pagination Logic
  const offset = currentPage * newsPerPage;
  const currentNews = sortedNews.slice(offset, offset + newsPerPage);
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
      <div className="mx-auto max-w-7xl mb-5">
        <h2 className="text-3xl font-bold text-gray-800 my-6 text-center">
          LATEST {path.toUpperCase()}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentNews.length > 0 ? (
            currentNews.map((news) => (
              <div
                key={news._id}
                className="rounded-lg shadow-lg overflow-hidden bg-white"
              >
                <img
                  src={news.imageURL}
                  alt={news.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold my-2">{news.title}</h3>
                  <p className="text-sm text-gray-600">
                    {news.author} | {new Date(news.date).toLocaleDateString()}
                  </p>
                  <p className="mt-2 text-gray-700">
                    {news.content[0]?.description.slice(0, 100)}...
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/news/${news._id}`, { state: { news } })
                    }
                    className="text-blue-500 font-semibold mt-3 inline-block"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">
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
              containerClassName="flex items-center space-x-2 border rounded-lg p-2"
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
