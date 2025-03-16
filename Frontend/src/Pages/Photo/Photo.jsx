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
        <div className="flex flex-col md:flex-row items-center gap-4 mt-6 p-6 bg-white  rounded-lg">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="🔍 Search by title..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
            />
          </div>
          <div className="relative w-full md:w-1/2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm bg-white"
            >
              <option value="">📂 All Categories</option>
              <option value="Event">🎉 Event</option>
              <option value="Project">📌 Project</option>
              <option value="Achievement">🏆 Achievement</option>
              <option value="Other">🔖 Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {currentPhotos.map((item) => (
            <div
              key={item.id}
              className="  rounded  shadow-lg shadow-gray-300 cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-64 object-cover rounded rounded-b-none"
              />
              <h3 className="text-center mt-2 font-light">{item.title}</h3>
            </div>
          ))}
        </div>

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
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center animate-fadeIn">
          <div className="relative bg-white rounded-md shadow-2xl max-w-lg md:max-w-xl w-full text-center transition-all duration-300 ease-in-out transform scale-95">
            <button
              className="absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-300"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes size={24} />
            </button>
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="w-full h-[500px] rounded-xl mb-4 shadow-md"
            />
            <h2 className="text-lg font-bold text-gray-800">
              {selectedImage.title}
            </h2>
            <p className="text-sm text-gray-600">{selectedImage.text}</p>
            <div className="flex justify-between ml-4 mr-4 mb-2">
              <button
                className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors duration-300"
                onClick={handlePrev}
              >
                <FaArrowLeft size={24} />
              </button>
              <button
                className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors duration-300"
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
