import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublice";
import useRDFStore from "../../storage/useRDFstorage";

const VideosPage = () => {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const Axios = useAxiosPublic();
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
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    Axios.delete(`/video/${id}`)
      .then(() => fetchVideo()) // Refresh list after deletion
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload a Video</h2>
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
      <h2 className="text-xl font-bold my-4">Video List</h2>
      <ul className="space-y-2">
        {video.map((vid) => (
          <li
            key={vid._id}
            className="flex justify-between items-center p-2 border rounded"
          >
            <div>
              <p className="font-medium">{vid.title}</p>
              <a
                href={vid.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Watch Video
              </a>
              <p className="text-sm text-gray-500">
                Published: {vid.publishedDate}
              </p>
            </div>
            <button
              onClick={() => handleDelete(vid._id)}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
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
