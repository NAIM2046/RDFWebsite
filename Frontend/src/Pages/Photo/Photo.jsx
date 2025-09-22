import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaImages,
} from "react-icons/fa";
import useRDFStore from "../../storage/useRDFstorage";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

const Photo = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const photosPerPage = 12;
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { photo, fetchPhoto } = useRDFStore();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      if (photo.length === 0) {
        await fetchPhoto();
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  const sortedPhotos = photo.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filteredPhotos = sortedPhotos.filter(
    (item) =>
      (searchTitle === "" ||
        item.title.toLowerCase().includes(searchTitle.toLowerCase())) &&
      (filterType === "" || item.photoType === filterType)
  );

  const offset = currentPage * photosPerPage;
  const currentPhotos = filteredPhotos.slice(offset, offset + photosPerPage);
  const pageCount = Math.ceil(filteredPhotos.length / photosPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (selectedImage) {
      const currentIndex = filteredPhotos.findIndex(
        (img) => img._id === selectedImage._id
      );
      const nextIndex = (currentIndex + 1) % filteredPhotos.length;
      setSelectedImage(filteredPhotos[nextIndex]);
    }
  };

  const handlePrev = () => {
    if (selectedImage) {
      const currentIndex = filteredPhotos.findIndex(
        (img) => img._id === selectedImage._id
      );
      const prevIndex =
        (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
      setSelectedImage(filteredPhotos[prevIndex]);
    }
  };

  const photoTypes = [...new Set(photo.map((item) => item.photoType))];

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>RDF - Photo Gallery</title>
        <meta
          name="description"
          content="Explore our photo gallery showcasing events, projects, and achievements"
        />
      </Helmet>

      {/* Modern Header Section */}
      <div className="relative bg-gradient-to-br from-gray-800 to-blue-800 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "120px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 mt-12 md:mt-0 bg-blue-600 rounded-2xl mb-6 shadow-lg"
          >
            <FaImages className="text-2xl text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Photo Gallery
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center items-center text-blue-200"
          >
            <a
              href="/"
              className="hover:text-white transition-colors duration-200"
            >
              Home
            </a>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">Photo Gallery</span>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white opacity-5"></div>
        <div className="absolute top-1/4 right-10 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div
          className="absolute bottom-10 left-10 w-24 h-24 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="flex items-center mt-4 md:mt-0">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 mr-3"
            >
              <FaFilter className="mr-2 text-gray-600" />
              Filters
            </button>

            {/* Clear Filters Button */}
            {(searchTitle || filterType) && (
              <button
                onClick={() => {
                  setSearchTitle("");
                  setFilterType("");
                }}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div
          className={`bg-white rounded-2xl shadow-sm p-6 mb-8 transition-all duration-300 ${
            isFilterOpen ? "block" : "hidden md:block"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Photos
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchTitle}
                  onChange={(e) => {
                    setSearchTitle(e.target.value);
                    setCurrentPage(0);
                  }}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Filter Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => {
                    setFilterType(e.target.value);
                    setCurrentPage(0);
                  }}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none bg-white"
                >
                  <option value="">All Categories</option>
                  {photoTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Content */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-gray-200 h-12 w-12 mb-4"></div>
              <div className="text-gray-500">Loading gallery...</div>
            </div>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center bg-white rounded-2xl shadow-sm p-12">
            <svg
              className="mx-auto h-16 w-16 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No photos found
            </h3>
            <p className="mt-2 text-gray-500">
              {searchTitle || filterType
                ? "Try adjusting your search or filter criteria"
                : "The gallery is currently empty"}
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setSearchTitle("");
                  setFilterType("");
                }}
                className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Clear filters
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {currentPhotos.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer group"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>

                    {item.photoType && (
                      <span className="absolute top-3 right-3 bg-white text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                        {item.photoType}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    {item.createdAt && (
                      <div className="flex items-center text-sm text-gray-500">
                        <FaCalendarAlt className="mr-1.5" />
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {pageCount > 1 && (
              <div className="flex justify-center mt-12">
                <ReactPaginate
                  previousLabel={
                    <span className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 shadow-sm">
                      Previous
                    </span>
                  }
                  nextLabel={
                    <span className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 shadow-sm">
                      Next
                    </span>
                  }
                  breakLabel={
                    <span className="px-4 py-2 text-gray-500">...</span>
                  }
                  pageCount={pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName="flex items-center space-x-2"
                  pageClassName="hidden sm:block"
                  pageLinkClassName="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 shadow-sm"
                  activeLinkClassName="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                  previousClassName="mr-2"
                  nextClassName="ml-2"
                  disabledClassName="opacity-50 cursor-not-allowed"
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center p-4 z-50"
            onClick={(e) =>
              e.target === e.currentTarget && setSelectedImage(null)
            }
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-gray-800 bg-opacity-70 rounded-full p-3 shadow-lg"
                onClick={() => setSelectedImage(null)}
              >
                <FaTimes size={24} />
              </button>

              {/* Navigation buttons */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors bg-gray-800 bg-opacity-70 rounded-full p-3 shadow-lg"
                onClick={handlePrev}
              >
                <FaArrowLeft size={24} />
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors bg-gray-800 bg-opacity-70 rounded-full p-3 shadow-lg"
                onClick={handleNext}
              >
                <FaArrowRight size={24} />
              </button>

              {/* Image */}
              <div className="flex-grow flex items-center justify-center p-4 overflow-hidden">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Caption */}
              <div className="bg-gray-800 bg-opacity-80 p-6 border-t border-gray-700">
                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedImage.title}
                </h3>
                {selectedImage.text && (
                  <p className="text-gray-300 mb-4">{selectedImage.text}</p>
                )}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div className="flex items-center space-x-4">
                    {selectedImage.photoType && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {selectedImage.photoType}
                      </span>
                    )}
                    {selectedImage.createdAt && (
                      <span className="inline-flex items-center text-sm text-gray-400">
                        <FaCalendarAlt className="mr-1.5" />
                        {formatDate(selectedImage.createdAt)}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 sm:mt-0 text-sm text-gray-400">
                    {filteredPhotos.findIndex(
                      (img) => img._id === selectedImage._id
                    ) + 1}{" "}
                    of {filteredPhotos.length}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Photo;
