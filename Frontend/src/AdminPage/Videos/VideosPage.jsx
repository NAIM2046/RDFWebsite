import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublice";
import useRDFStore from "../../storage/useRDFstorage";
import useAxiosSecure from "../../Hook/useAxoisSecure";

const VideosPage = () => {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const Axios = useAxiosSecure();
  const { video, fetchVideo } = useRDFStore();
  useEffect(() => {
    if (video.length === 0) {
      fetchVideo();
    }
  }, []);
  console.log(video);

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
        fetchVideo();
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    Axios.delete(`/video/${id}`)
      .then(() => fetchVideo()) // Refresh list after deletion
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
        {video.map((vid) => (
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
