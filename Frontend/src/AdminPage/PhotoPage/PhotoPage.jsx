import React, { useEffect, useState } from "react";
import uploadImageToImgbb from "../../Hook/ImgUpload";
import useAxiosSecure from "../../Hook/useAxoisSecure";
import useRDFStore from "../../storage/useRDFstorage";
import { Helmet } from "react-helmet-async";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PhotoPage = () => {
  // Initial state: imageUrl as an array
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: [], // now array
    text: "",
    photoType: "Event",
  });

  const [uploadStatus, setUploadStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [filterType, setFilterType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const photosPerPage = 6;
  const AxiosSecure = useAxiosSecure();

  const { photo, fetchPhoto } = useRDFStore();

  useEffect(() => {
    const loadPhotos = async () => {
      setIsLoading(true);
      try {
        await fetchPhoto();
      } catch (error) {
        toast.error("Failed to load photos");
      } finally {
        setIsLoading(false);
      }
    };
    loadPhotos();
  }, []);

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 10 * 1024 * 1024; // 5MB

    setIsUploading(true);
    setUploadStatus("Uploading...");

    try {
      const uploadedUrls = [];

      for (const file of files) {
        if (!validTypes.includes(file.type)) {
          toast.error(`${file.name} is not a valid image type`);
          continue;
        }
        if (file.size > maxSize) {
          toast.error(`${file.name} is larger than 5MB`);
          continue;
        }

        const url = await uploadImageToImgbb(file);
        if (url) {
          uploadedUrls.push(url);
        }
      }

      if (uploadedUrls.length > 0) {
        setFormData((prev) => ({
          ...prev,
          imageUrl: [...prev.imageUrl, ...uploadedUrls],
        }));
        setUploadStatus("Upload successful!");
        toast.success("Images uploaded successfully");
      } else {
        setUploadStatus("No valid images uploaded");
      }
    } catch (error) {
      setUploadStatus("Upload failed. Try again.");
      toast.error("Image upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.imageUrl.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      setIsLoading(true);
      await AxiosSecure.post("/photos", formData); // backend should accept array of imageUrl
      toast.success("Photos added successfully");

      // Reset form
      setFormData({
        title: "",
        imageUrl: [],
        text: "",
        photoType: "Event",
      });
      setUploadStatus("");
      await fetchPhoto();
    } catch (error) {
      toast.error("Failed to add photos");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;

    try {
      await AxiosSecure.delete(`/photos/${id}`);
      toast.success("Photo deleted successfully");
      await fetchPhoto();
    } catch (error) {
      toast.error("Failed to delete photo");
      console.error(error);
    }
  };

  const filteredPhotos = photo.filter(
    (item) =>
      (searchTitle === "" ||
        item.title.toLowerCase().includes(searchTitle.toLowerCase())) &&
      (filterType === "" || item.photoType === filterType)
  );

  // Pagination logic
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = filteredPhotos.slice(
    indexOfFirstPhoto,
    indexOfLastPhoto
  );
  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Helmet>
        <title>RDF - Photo Gallery</title>
      </Helmet>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Upload Form Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Upload a Photo
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo Type *
            </label>
            <select
              name="photoType"
              value={formData.photoType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Event">Event</option>
              <option value="Project">Project</option>
              <option value="Achievement">Achievement</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image Upload * (JPEG, PNG, WebP, max 10MB)
            </label>
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              multiple // 👈 allow multiple uploads
              onChange={handleImageUpload}
              className="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              disabled={isUploading}
            />

            {uploadStatus && (
              <p
                className={`text-sm mt-1 ${
                  uploadStatus.includes("failed")
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {uploadStatus}
              </p>
            )}
          </div>

          {formData.imageUrl.length > 0 && (
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
              {formData.imageUrl.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Uploaded preview ${i + 1}`}
                  className="w-full h-32 object-cover rounded-md border"
                />
              ))}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={isUploading || isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isUploading || isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isUploading || isLoading ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Photo Gallery Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Photo Gallery
          </h2>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTitle}
              onChange={(e) => {
                setSearchTitle(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="Event">Event</option>
              <option value="Project">Project</option>
              <option value="Achievement">Achievement</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTitle || filterType
              ? "No photos match your search criteria"
              : "No photos available"}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentPhotos.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {item.title}
                      </h3>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {item.photoType}
                      </span>
                    </div>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    {item.text && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {item.text}
                      </p>
                    )}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="mt-3 w-full py-1 px-3 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="py-1 px-3 border rounded-md bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`py-1 px-3 border rounded-md ${
                        currentPage === number
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="py-1 px-3 border rounded-md bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PhotoPage;
