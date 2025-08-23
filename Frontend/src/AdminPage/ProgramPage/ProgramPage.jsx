import React, { useEffect, useState } from "react";
import uploadImageToImgbb from "../../Hook/ImgUpload";
import useAxiosSecure from "../../Hook/useAxoisSecure";
import useRDFStore from "../../storage/useRDFstorage";
import {
  FaTrash,
  FaPlus,
  FaSpinner,
  FaCheckCircle,
  FaTimes,
  FaEdit,
} from "react-icons/fa";

const ProgramPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    focus: [],
    images: [],
    videoId: "",
  });
  const [focusInput, setFocusInput] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  const Axios = useAxiosSecure();
  const { programs, fetchPrograms } = useRDFStore();

  useEffect(() => {
    if (programs.length === 0) {
      fetchPrograms();
    }
  }, [fetchPrograms, programs.length]);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocusAdd = (e) => {
    e.preventDefault();
    if (focusInput.trim() && !formData.focus.includes(focusInput)) {
      setFormData({ ...formData, focus: [...formData.focus, focusInput] });
      setFocusInput("");
      if (errors.focus) setErrors({ ...errors, focus: "" });
    }
  };

  const handleFocusRemove = (focusItem) => {
    setFormData({
      ...formData,
      focus: formData.focus.filter((item) => item !== focusItem),
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Create previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...previews]);
  };

  const handleImageUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    try {
      const uploadedImageUrls = [];
      for (const file of selectedFiles) {
        const uploadedUrl = await uploadImageToImgbb(file);
        if (uploadedUrl) uploadedImageUrls.push(uploadedUrl);
      }
      setFormData({
        ...formData,
        images: [...formData.images, ...uploadedImageUrls],
      });
      showNotification("success", "Images uploaded successfully!");
      setSelectedFiles([]);
      if (errors.images) setErrors({ ...errors, images: "" });
    } catch (error) {
      console.error("Upload error:", error);
      showNotification("error", "Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.focus.length === 0)
      newErrors.focus = "At least one key focus is required";
    if (formData.images.length === 0)
      newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (editingId) {
        // Update existing program
        const response = await Axios.put(`/programs/${editingId}`, formData);
        if (response.data) {
          showNotification("success", "Program updated successfully!");
          fetchPrograms();
          resetForm();
        }
      } else {
        // Create new program
        const response = await Axios.post("/programs", formData);
        if (response.data) {
          showNotification("success", "Program added successfully!");
          fetchPrograms();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      showNotification(
        "error",
        `Failed to ${editingId ? "update" : "add"} program`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      focus: [],
      images: [],
      videoId: "",
    });
    setPreviewImages([]);
    setFocusInput("");
    setErrors({});
    setEditingId(null);
  };

  const handleEdit = (program) => {
    setFormData({
      title: program.title,
      description: program.description,
      focus: [...program.focus],
      images: [...program.images],
      videoId: program.videoId || "",
    });
    setPreviewImages([...program.images]);
    setEditingId(program._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this program?"))
      return;

    try {
      await Axios.delete(`/programs/${id}`);
      showNotification("success", "Program deleted successfully!");
      fetchPrograms();

      // If we're deleting the program we're currently editing, reset the form
      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.error("Delete error:", error);
      showNotification("error", "Failed to delete program");
    }
  };

  const handleImageRemove = (index) => {
    setPreviewImages(previewImages.filter((_, i) => i !== index));
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {notification.type === "success" ? (
            <FaCheckCircle className="mr-2" />
          ) : (
            <FaTimes className="mr-2" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {editingId ? "Edit Program" : "Add New Program"}
        </h2>

        {editingId && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-800 text-sm">
              You are currently editing a program.{" "}
              <button
                onClick={resetForm}
                className="text-blue-600 font-medium underline hover:text-blue-800"
              >
                Cancel edit
              </button>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Program Title *
            </label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter program title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Program Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter program description"
              rows="5"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Focus Areas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Focus Areas *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={focusInput}
                onChange={(e) => setFocusInput(e.target.value)}
                className={`flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.focus ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter a key focus area"
              />
              <button
                onClick={handleFocusAdd}
                className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <FaPlus className="mr-1" /> Add
              </button>
            </div>
            {errors.focus && (
              <p className="mt-1 text-sm text-red-600">{errors.focus}</p>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.focus.map((item, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg flex items-center"
                >
                  <span className="mr-2">{item}</span>
                  <button
                    type="button"
                    onClick={() => handleFocusRemove(item)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Program Images *
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                type="button"
                onClick={handleImageUpload}
                disabled={selectedFiles.length === 0 || uploading}
                className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {uploading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <FaPlus className="mr-1" /> Upload Images
                  </>
                )}
              </button>
            </div>
            {errors.images && (
              <p className="mt-1 text-sm text-red-600">{errors.images}</p>
            )}
            {previewImages.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  {editingId ? "Current Images" : "Image Previews"}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {previewImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt="Preview"
                        className="w-full h-24 object-cover rounded-lg shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageRemove(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTimes size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Video ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              YouTube Video ID
            </label>
            <input
              name="videoId"
              type="text"
              value={formData.videoId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter YouTube video ID (optional)"
            />
            <p className="mt-1 text-xs text-gray-500">
              Example: For "https://www.youtube.com/watch?v=dQw4w9WgXcQ", enter
              "dQw4w9WgXcQ"
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed font-medium flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Processing...
              </>
            ) : editingId ? (
              "Update Program"
            ) : (
              "Add Program"
            )}
          </button>
        </form>
      </div>

      {/* Program List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Program List</h2>
        {programs.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No programs added yet
          </p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {programs.map((program) => (
              <li key={program._id} className="py-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {program.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {program.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {program.focus.map((focus, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(program)}
                      className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors"
                      title="Edit program"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(program._id)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                      title="Delete program"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProgramPage;
