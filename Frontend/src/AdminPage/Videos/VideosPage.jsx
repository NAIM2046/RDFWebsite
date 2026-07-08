import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxoisSecure";

const VideosPage = () => {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const Axios = useAxiosSecure();
  const [video, setVideo] = useState([]);

  const fetchLocalVideos = async () => {
    try {
      const response = await Axios.get("/video");
      setVideo(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchLocalVideos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const videoinfo = {
      title,
      videoUrl,
      publishedDate,
    };
    Axios.post("/video", videoinfo)
      .then((res) => {
        console.log(res.data);
        alert("add video successfully");
        fetchLocalVideos();
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    Axios.delete(`/video/${id}`)
      .then(() => fetchLocalVideos()) // Refresh list after deletion
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-4 max-w-7xl mx-auto  rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Upload a Video</h2>
      <div className="mx-auto max-w-md">
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
            <label className="block text-sm font-medium">Video URL:</label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Published Date:</label>
            <input
              type="date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
      <h2 className="text-xl font-bold my-4">Video List</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...video].sort((a, b) => {
          const dateA = a.publishedDate ? new Date(a.publishedDate) : new Date(0);
          const dateB = b.publishedDate ? new Date(b.publishedDate) : new Date(0);
          if (dateB - dateA !== 0) return dateB - dateA;
          return b._id ? b._id.localeCompare(a._id) : 0;
        }).map((vid) => (
          <li
            key={vid._id}
            className="p-4 border rounded-lg shadow-md flex flex-col justify-between"
          >
            <p className="font-medium text-lg">{vid.title}</p>
            <iframe
              src={`https://www.youtube.com/embed/${vid.videoUrl}`}
              title={vid.title}
              className="w-full h-48 my-2 rounded-lg"
              allowFullScreen
            ></iframe>
            <p className="text-sm text-gray-500">
              Published: {vid.publishedDate}
            </p>
            <button
              onClick={() => handleDelete(vid._id)}
              className="mt-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideosPage;
