import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiTrash2,
  FiUpload,
  FiImage,
  FiEdit,
  FiX,
} from "react-icons/fi";
import useRDFStore from "../../storage/useRDFstorage";
import uploadImageToImgbb from "../../Hook/ImgUpload";
import useAxiosSecure from "../../Hook/useAxoisSecure";

const EventPageadmin = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    type: "Upcoming",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const Axios = useAxiosSecure();
  const { events, fetchEvent } = useRDFStore();

  useEffect(() => {
    if (events.length === 0) {
      fetchEvent();
    }
  }, [events, fetchEvent]);

  // Reset form when switching tabs or modes
  useEffect(() => {
    if (activeTab === "create" && !isEditMode) {
      resetForm();
    }
  }, [activeTab, isEditMode]);

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      type: "Upcoming",
    });
    setImages([]);
    setEditingEvent(null);
    setIsEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    setLoading(true);
    const uploadedUrls = [];

    try {
      for (let file of files) {
        const imageUrl = await uploadImageToImgbb(file);
        uploadedUrls.push(imageUrl);
      }
      setImages((prev) => [...prev, ...uploadedUrls]);
      toast.success(`${files.length} image(s) uploaded successfully!`);
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload some images");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const eventData = {
      ...formData,
      images,
    };

    try {
      if (isEditMode && editingEvent) {
        // Update existing event
        await Axios.put(`/event/${editingEvent._id}`, eventData);
        toast.success("Event updated successfully!");
      } else {
        // Create new event
        await Axios.post("/event", eventData);
        toast.success("Event created successfully!");
      }

      resetForm();
      fetchEvent();
      setActiveTab("manage");
    } catch (err) {
      console.error(err);
      toast.error(
        isEditMode ? "Failed to update event" : "Failed to create event"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setIsEditMode(true);
    setFormData({
      title: event.title,
      date: event.date.split("T")[0], // Format date for input
      time: event.time,
      location: event.location,
      description: event.description,
      type: event.type,
    });
    setImages(event.images || []);
    setActiveTab("create");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await Axios.delete(`/event/${id}`);
        toast.success("Event deleted successfully!");
        fetchEvent();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete event");
      }
    }
  };

  const cancelEdit = () => {
    resetForm();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Event Management</h1>
        {isEditMode && (
          <button
            onClick={cancelEdit}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <FiX className="mr-2" /> Cancel Edit
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "create"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("create")}
        >
          {isEditMode ? "Edit Event" : "Create Event"}
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "manage"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("manage")}
        >
          Manage Events
        </button>
      </div>

      {activeTab === "create" ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title*
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter event title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Type*
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Upcoming">Upcoming Event</option>
                <option value="Past">Past Event</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiClock className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 2:00 PM"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter event location"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Enter event description"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600 justify-center">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>Upload images</span>
                    <input
                      type="file"
                      multiple
                      onChange={handleImageUpload}
                      className="sr-only"
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>

            {loading && (
              <div className="mt-2 text-sm text-gray-500">
                Uploading images...
              </div>
            )}

            {images.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  {isEditMode ? "Current Images" : "Uploaded Images"}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Preview ${index}`}
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            {isEditMode && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update Event"
                : "Create Event"}
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">
              All Events ({events.length})
            </h2>
            <button
              onClick={() => setActiveTab("create")}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            >
              Create New Event
            </button>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No events
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new event.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setActiveTab("create")}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiUpload className="-ml-1 mr-2 h-5 w-5" />
                  New Event
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Event
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date & Time
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {events.map((event) => (
                    <tr key={event._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          {event.images?.length > 0 ? (
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={event.images[0]}
                                alt=""
                              />
                            </div>
                          ) : (
                            <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
                              <FiImage className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {event.title}
                            </div>
                            <div className="text-gray-500 line-clamp-1">
                              {event.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>{new Date(event.date).toLocaleDateString()}</div>
                        <div className="text-gray-400">{event.time}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            event.type === "Upcoming"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {event.type}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(event)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit event"
                          >
                            <FiEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(event._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete event"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventPageadmin;
