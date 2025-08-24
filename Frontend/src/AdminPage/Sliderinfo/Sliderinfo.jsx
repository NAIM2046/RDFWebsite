import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublice";
import useRDFStore from "../../storage/useRDFstorage";
import useAxiosSecure from "../../Hook/useAxoisSecure";
import uploadImageToImgbb from "../../Hook/ImgUpload";
import {
  FaSpinner,
  FaTrash,
  FaEdit,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
} from "react-icons/fa";

const Sliderinfo = () => {
  const [slider, setSlider] = useState({
    src: "",
    header: "",
    text: "",
    slideNumber: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingSlider, setEditingSlider] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "", // 'success' or 'error'
    message: "",
  });

  const AxiosSecure = useAxiosSecure();
  const { isLoading, sliderinfo, fetchsliderinfo } = useRDFStore();

  useEffect(() => {
    if (sliderinfo.length === 0) {
      fetchsliderinfo();
    }
  }, [sliderinfo.length, fetchsliderinfo]);

  // Reset form when switching modes
  useEffect(() => {
    if (!isEditMode) {
      resetForm();
    }
  }, [isEditMode]);

  const resetForm = () => {
    setSlider({
      src: "",
      header: "",
      text: "",
      slideNumber: "",
    });
    setEditingSlider(null);
    setIsEditMode(false);
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 5000);
  };

  const handleChange = (e) => {
    if (e.target.name === "src") {
      const file = e.target.files[0];
      if (file) {
        setIsUploading(true);
        uploadImageToImgbb(file)
          .then((url) => {
            setSlider({ ...slider, src: url });
            showNotification("success", "Image uploaded successfully!");
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
            showNotification(
              "error",
              "Failed to upload image. Please try again."
            );
          })
          .finally(() => setIsUploading(false));
      }
    } else {
      setSlider({ ...slider, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEditMode && editingSlider) {
        // Update existing slider
        const result = await AxiosSecure.put(
          `/slider/${editingSlider._id}`,
          slider
        );
        if (result.data) {
          showNotification("success", "Slider Updated Successfully!");
          fetchsliderinfo();
          resetForm();
        }
      } else {
        // Create new slider
        const result = await AxiosSecure.post("/slider", slider);
        if (result.data) {
          showNotification("success", "Slider Info Saved Successfully!");
          fetchsliderinfo();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error saving slider:", error);
      showNotification("error", "Failed to save slider. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (sliderItem) => {
    setEditingSlider(sliderItem);
    setIsEditMode(true);
    setSlider({
      src: sliderItem.src,
      header: sliderItem.header,
      text: sliderItem.text,
      slideNumber: sliderItem.slideNumber || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this slider?")) return;

    try {
      const result = await AxiosSecure.delete(`/slider/${id}`);
      if (result.data) {
        showNotification("success", "Slider Deleted Successfully!");
        fetchsliderinfo();
      }
    } catch (error) {
      console.error("Error deleting slider:", error);
      showNotification("error", "Failed to delete slider. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Notification Toast */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center ${
            notification.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {notification.type === "success" ? (
            <FaCheckCircle className="mr-2" />
          ) : (
            <FaExclamationTriangle className="mr-2" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Slider Management
          </h1>
          {isEditMode && (
            <button
              onClick={resetForm}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              <FaTimes className="mr-2" /> Cancel Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {isEditMode ? "Edit Slider" : "Add New Slider"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slide Number *
                </label>
                <input
                  type="number"
                  name="slideNumber"
                  value={slider.slideNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter slide number (1, 2, 3...)"
                  min="1"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Determines the order of slides (lower numbers appear first)
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slider Image *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="src"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isUploading}
                    required={!isEditMode} // Not required when editing (can keep existing image)
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-gray-100 bg-opacity-70 flex items-center justify-center rounded-md">
                      <FaSpinner className="animate-spin text-blue-500" />
                    </div>
                  )}
                </div>
                {isEditMode && slider.src && (
                  <p className="text-xs text-blue-500 mt-1">
                    Leave empty to keep current image
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Header Text *
                </label>
                <input
                  type="text"
                  name="header"
                  value={slider.header}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter header text"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="text"
                  value={slider.text}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter slider description"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                  isSubmitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition-colors`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    {isEditMode ? "Updating..." : "Saving..."}
                  </span>
                ) : isEditMode ? (
                  "Update Slider"
                ) : (
                  "Save Slider"
                )}
              </button>
            </form>

            {/* Preview Section */}
            {slider.src && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Preview
                </h3>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={slider.src}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="mt-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {slider.header}
                    </h4>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      Slide #{slider.slideNumber}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{slider.text}</p>
                </div>
              </div>
            )}
          </div>

          {/* Existing Sliders Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Existing Sliders
              </h2>
              <span className="text-sm text-gray-500">
                {sliderinfo.length} slider(s)
              </span>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <FaSpinner className="animate-spin text-blue-500 text-2xl" />
                <span className="ml-2 text-gray-600">Loading sliders...</span>
              </div>
            ) : sliderinfo.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No sliders found. Add your first slider using the form.
              </div>
            ) : (
              <div className="space-y-4">
                {sliderinfo
                  .sort((a, b) => (a.slideNumber || 0) - (b.slideNumber || 0))
                  .map((item) => (
                    <div
                      key={item._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={item.src}
                            alt={item.header}
                            className="w-32 h-20 object-cover rounded"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-800">
                                {item.header}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {item.text}
                              </p>
                            </div>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded whitespace-nowrap">
                              #{item.slideNumber || "N/A"}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 self-center flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors"
                            title="Edit slider"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                            title="Delete slider"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sliderinfo;
