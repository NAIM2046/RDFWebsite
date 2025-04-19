import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import useRDFStore from "../../storage/useRDFstorage";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet-async";

const Photo = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const photosPerPage = 3;

  const { photo, fetchPhoto } = useRDFStore();

  useEffect(() => {
    if (photo.length === 0) {
      fetchPhoto();
    }
  }, []);

  const filteredPhotos = photo.filter(
    (item) =>
      (searchTitle === "" ||
        item.title.toLowerCase().includes(searchTitle.toLowerCase())) &&
      (filterType === "" || item.photoType === filterType)
  );

  const offset = currentPage * photosPerPage;
  const currentPhotos = filteredPhotos.slice(offset, offset + photosPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleNext = () => {
    if (selectedImage) {
      const currentIndex = photo.findIndex(
        (img) => img._id === selectedImage._id
      );
      setSelectedImage(photo[(currentIndex + 1) % photo.length]);
    }
  };

  const handlePrev = () => {
    if (selectedImage) {
      const currentIndex = photo.findIndex(
        (img) => img._id === selectedImage._id
      );
      setSelectedImage(photo[(currentIndex - 1 + photo.length) % photo.length]);
    }
  };

  return (
    <div>
      <Helmet>
        <title> RDF-Photos Gallery </title>
      </Helmet>
      <PageCoverPhoto
        title="Our Gallery"
        subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
      />

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-stretch gap-4 mt-6 p-6 bg-white rounded-xl ">
          {/* Search Input */}
          <div className="w-full md:w-1/2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Search by Title
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Type a title..."
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm placeholder-gray-400"
              />
            </div>
          </div>

          {/* Filter Dropdown */}
          <div className="w-full md:w-1/2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Filter by Category
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm bg-white text-gray-700"
            >
              <option value="">📂 All Categories</option>
              <option value="Event">🎉 Event</option>
              <option value="Project">📌 Project</option>
              <option value="Achievement">🏆 Achievement</option>
              <option value="Other">🔖 Other</option>
            </select>
          </div>
        </div>

        {photo.length === 0 ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-gray-700"></div>
            <p className="text-lg ml-3">Loading News...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {currentPhotos.map((item) => (
              <div
                key={item.id}
                className="rounded-lg shadow-lg shadow-gray-300 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-t-lg"
                />
                <p className="text-center px-2 py-2 text-sm sm:text-base font-light text-gray-700">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center p-4">
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(filteredPhotos.length / photosPerPage)}
            marginPagesDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName="flex items-center space-x-2  rounded-lg p-2"
            pageClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
            activeClassName="bg-blue-500 text-white"
            previousClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
            nextClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-4 animate-fadeIn z-50">
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl text-center transition-all duration-300 ease-in-out transform scale-95">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors duration-300"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes size={24} />
            </button>

            {/* Image */}
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] rounded-t-lg object-contain mb-4"
            />

            {/* Title */}
            <h2 className="text-base sm:text-lg font-bold text-gray-800 px-4">
              {selectedImage.title}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 px-4 mb-4">
              {selectedImage.text}
            </p>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center px-6 pb-4">
              <button
                className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                onClick={handlePrev}
              >
                <FaArrowLeft size={24} />
              </button>
              <button
                className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                onClick={handleNext}
              >
                <FaArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photo;
