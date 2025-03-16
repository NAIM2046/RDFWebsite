import React, { useEffect, useState } from "react";
import uploadImageToImgbb from "../../Hook/ImgUpload";
import useAxiosSecure from "../../Hook/useAxoisSecure";
import useRDFStore from "../../storage/useRDFstorage";
import { Helmet } from "react-helmet-async";

const PhotoPage = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");
  const [photoType, setPhotoType] = useState("Event");
  const [uploadStatus, setUploadStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [filterType, setFilterType] = useState("");
  const photosPerPage = 3;
  const AxiosSecure = useAxiosSecure();

  const { photo, fetchPhoto } = useRDFStore();

  useEffect(() => {
    fetchPhoto();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setUploadStatus("Uploading...");
      const url = await uploadImageToImgbb(file);
      if (url) {
        setImageUrl(url);
        setUploadStatus("Successfully uploaded!");
      } else {
        setUploadStatus("Upload failed. Try again.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const photoinfo = {
      title,
      imageUrl,
      text,
      photoType,
    };

    AxiosSecure.post("/photos", photoinfo)
      .then((res) => {
        console.log(res.data);
        fetchPhoto();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    AxiosSecure.delete(`/photos/${id}`)
      .then(() => fetchPhoto())
      .catch((err) => console.log(err));
  };

  const filteredPhotos = photo.filter(
    (item) =>
      (searchTitle === "" ||
        item.title.toLowerCase().includes(searchTitle.toLowerCase())) &&
      (filterType === "" || item.photoType === filterType)
  );

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = filteredPhotos.slice(
    indexOfFirstPhoto,
    indexOfLastPhoto
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 max-w-3xl mx-auto border rounded-lg shadow-md">
      <Helmet>
        <title> RDF-Photos </title>
      </Helmet>
      <h2 className="text-xl font-bold mb-4">Upload a Photo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Photo Type:</label>
          <select
            value={photoType}
            onChange={(e) => setPhotoType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Event">Event</option>
            <option value="Project">Project</option>
            <option value="Achievement">Achievement</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Upload Image:</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full p-2"
            required
          />
          {uploadStatus && (
            <p className="text-sm text-green-600">{uploadStatus}</p>
          )}
        </div>
        {imageUrl && (
          <div>
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-full h-40 object-cover rounded"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium">Text:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6">Photo List</h2>
      <div className="flex space-x-4 mt-2">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option value="Event">Event</option>
          <option value="Project">Project</option>
          <option value="Achievement">Achievement</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {currentPhotos.map((item) => (
          <div key={item._id} className="border p-2 rounded shadow-md">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm italic">Type: {item.photoType}</p>
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-32 object-cover rounded mt-2"
            />
            <p className="text-sm mt-1">{item.text}</p>
            <button
              onClick={() => handleDelete(item._id)}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-600 mt-2 w-full"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border rounded bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastPhoto >= filteredPhotos.length}
          className="p-2 border rounded bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PhotoPage;
