import React, { useEffect, useState } from "react";

import useRDFStore from "../../storage/useRDFstorage";
import uploadImageToImgbb from "../../Hook/ImgUpload"; // Import ImgBB upload function
import useAxiosSecure from "../../Hook/useAxoisSecure";

const EventPageadmin = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // Store multiple image URLs
  const [type, setType] = useState("Upcoming");
  const [loading, setloading] = useState(false);

  const Axios = useAxiosSecure();
  const { events, fetchEvent } = useRDFStore();

  useEffect(() => {
    if (events.length === 0) {
      fetchEvent();
    }
  }, [events, fetchEvent]);

  // ✅ Handle Multiple Image Upload to ImgBB
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    setloading(true);
    const uploadedUrls = [];
    for (let file of files) {
      try {
        const imageUrl = await uploadImageToImgbb(file);
        uploadedUrls.push(imageUrl);
        setloading(false);
      } catch (error) {
        console.error("Image upload failed:", error);
        setloading(false);
      }
    }

    setImages([...images, ...uploadedUrls]); // Append new images to state
  };

  // ✅ Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      title,
      date,
      time,
      location,
      description,
      images,
      type,
    };
    console.log(eventData);
    Axios.post("/event", eventData)
      .then((res) => {
        console.log(res.data);
        fetchEvent();
      })
      .catch((err) => console.log(err));
  };

  // ✅ Handle Event Deletion
  const handleDelete = (id) => {
    Axios.delete(`/event/${id}`)
      .then(() => {
        fetchEvent();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create an Event</h2>
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
          <label className="block text-sm font-medium">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Time:</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        {/* ✅ Multiple Image Upload */}
        <div>
          <label className="block text-sm font-medium">Upload Images:</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
          />
          {/* ✅ Display Image Previews */}
          <div className="flex gap-2 mt-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Uploaded"
                className="w-16 h-16 object-cover rounded"
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Event Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Past">Past</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {/* ✅ Event List */}
      <h2 className="text-xl font-bold mt-6 mb-4">Event List</h2>
      <ul className="space-y-2">
        {events.map((event) => (
          <li
            key={event._id}
            className="p-2 border rounded flex justify-between items-center"
          >
            <span>
              {event.title} - {event.date}
            </span>
            <button
              onClick={() => handleDelete(event._id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventPageadmin;
