import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import useRDFStore from "../../storage/useRDFstorage";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

const Photo = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const photosPerPage = 9; // Increased for better grid layout
  const [isLoading, setIsLoading] = useState(true);

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
  console.log(photo);
  const filteredPhotos = photo.filter(
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>RDF - Photo Gallery</title>
        <meta
          name="description"
          content="Explore our photo gallery showcasing events, projects, and achievements"
        />
      </Helmet>

      <PageCoverPhoto
        title="Our Gallery"
        subtitle="Capturing moments that inspire change and document our journey towards making a difference."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Explore Our Gallery
          </h2>

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
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                  <FaFilter className="text-gray-900" />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => {
                    setFilterType(e.target.value);
                    setCurrentPage(0);
                  }}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none bg-white"
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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center bg-white rounded-xl shadow-sm p-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
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
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No photos found
            </h3>
            <p className="mt-1 text-gray-500">
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
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear filters
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPhotos.map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    {item.photoType && (
                      <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        {item.photoType}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {pageCount > 1 && (
              <div className="flex justify-center mt-10">
                <ReactPaginate
                  previousLabel={
                    <span className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      Previous
                    </span>
                  }
                  nextLabel={
                    <span className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      Next
                    </span>
                  }
                  breakLabel={<span className="px-4 py-2">...</span>}
                  pageCount={pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName="flex items-center space-x-2"
                  pageClassName="hidden sm:block"
                  pageLinkClassName="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
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
            className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center p-4 z-50"
            onClick={(e) =>
              e.target === e.currentTarget && setSelectedImage(null)
            }
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 transition-colors bg-white rounded-full p-2 shadow-md"
                onClick={() => setSelectedImage(null)}
              >
                <FaTimes size={20} />
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
              <div className="bg-gray-50 p-6 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {selectedImage.title}
                </h3>
                {selectedImage.text && (
                  <p className="text-gray-600 mb-4">{selectedImage.text}</p>
                )}
                <div className="flex justify-between items-center">
                  {selectedImage.photoType && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {selectedImage.photoType}
                    </span>
                  )}
                  <div className="flex space-x-4">
                    <button
                      className="text-gray-700 hover:text-blue-600 transition-colors p-2"
                      onClick={handlePrev}
                    >
                      <FaArrowLeft size={20} />
                    </button>
                    <button
                      className="text-gray-700 hover:text-blue-600 transition-colors p-2"
                      onClick={handleNext}
                    >
                      <FaArrowRight size={20} />
                    </button>
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
