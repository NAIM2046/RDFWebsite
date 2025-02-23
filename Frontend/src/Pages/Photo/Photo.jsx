import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import coverimg from "/assets/RDF Photo/grallerycover1.avif";
const images = [
  {
    id: 1,
    title: "Education Program",
    src: "/assets/RDF Photo/GGE (2).jpg",
    text: "Helping children get quality education.",
  },
  {
    id: 2,
    title: "Health Camp",
    src: "/assets/RDF Photo/GGE (5).jpg",
    text: "Providing free medical checkups.",
  },
  {
    id: 3,
    title: "Food Distribution",
    src: "/assets/RDF Photo/CEMB (6).jpg",
    text: "Distributing food to the needy.",
  },
  {
    id: 4,
    title: "Women Empowerment",
    src: "/assets/RDF Photo/CEMB (6).jpg",
    text: "Supporting women through skill development programs.",
  },
  {
    id: 5,
    title: "Tree Plantation",
    src: "/assets/RDF Photo/CEMB (6).jpg",
    text: "Promoting environmental sustainability through tree planting.",
  },
  {
    id: 6,
    title: "Disaster Relief",
    src: "/assets/RDF Photo/CEMB (3).JPG",
    text: "Providing emergency aid to disaster-affected areas.",
  },
  {
    id: 7,
    title: "Scholarship Program",
    src: "/assets/RDF Photo/CEMB (4).JPG",
    text: "Offering financial support to underprivileged students.",
  },
  {
    id: 8,
    title: "Vocational Training",
    src: "/assets/RDF Photo/CEMB (11).jpg",
    text: "Enhancing job opportunities through vocational education.",
  },
  {
    id: 9,
    title: "Elderly Care",
    src: "/assets/RDF Photo/CEMB.jpeg",
    text: "Providing assistance and companionship to senior citizens.",
  },
  {
    id: 10,
    title: "Community Development",
    src: "/assets/RDF Photo/CEMB.JPG",
    text: "Building infrastructure and resources for local communities.",
  },
];

const Photo = () => {
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = selectedTitle
    ? images.filter((img) => img.title === selectedTitle)
    : images;

  const handleNext = () => {
    if (selectedImage) {
      const currentIndex = images.findIndex(
        (img) => img.id === selectedImage.id
      );
      setSelectedImage(images[(currentIndex + 1) % images.length]);
    }
  };

  const handlePrev = () => {
    if (selectedImage) {
      const currentIndex = images.findIndex(
        (img) => img.id === selectedImage.id
      );
      setSelectedImage(
        images[(currentIndex - 1 + images.length) % images.length]
      );
    }
  };

  return (
    <div className="">
      <PageCoverPhoto
        title="Our Gallery"
        subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
      ></PageCoverPhoto>

      <div className="mx-auto max-w-7xl">
        <div className="flex justify-center my-6">
          <select
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
            className="p-3 border rounded-full w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] bg-gradient-to-r text-black text-base md:text-lg font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <option value="" className="text-gray-700 text-base md:text-lg p-2">
              All Categories
            </option>
            {images.map((img) => (
              <option
                key={img.id}
                value={img.title}
                className="text-gray-800 p-2"
              >
                {img.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto max-w-6xl">
          {filteredImages.map((img) => (
            <div key={img.id} className="text-center">
              <img
                src={img.src}
                alt={img.title}
                className="w-full max-w-[350px] mx-auto object-cover cursor-pointer  shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                onClick={() => setSelectedImage(img)}
              />
              <p className="mt-2 text-lg font-semibold text-gray-700">
                {img.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center  animate-fadeIn">
          <div className="relative bg-white  rounded-md shadow-2xl max-w-lg md:max-w-xl w-full text-center transition-all duration-300 ease-in-out transform scale-95 ">
            <button
              className="absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-300"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes size={24} />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full rounded-xl mb-4 shadow-md"
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
